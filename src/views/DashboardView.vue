<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase'; 

// --- CONFIGURACIÓN ---
const auth = getAuth(app);
const db = getFirestore(app);

// --- ESTADOS ---
const user = ref(null);
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const loading = ref(false);
const sendingReport = ref(false);

const leads = ref([]);
const displayLimit = ref(15);
const activeTab = ref('contact'); // 'contact' | 'diagnosis'
const filterStatus = ref('all'); // 'all' | 'nuevo' | 'contactado'
const expandedLeadId = ref(null);
const noteBuffer = ref('');
const reportConfig = ref({ frequency: 'weekly', email: '', active: false });

// --- 1. AUTH & INIT ---
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    if (currentUser) {
      subscribeToData();
      loadReportConfig();
    }
  });
});

const handleLogin = async () => {
  loading.value = true;
  errorMsg.value = '';
  try { await signInWithEmailAndPassword(auth, email.value, password.value); } 
  catch (e) { errorMsg.value = "Credenciales incorrectas."; } 
  finally { loading.value = false; }
};

const handleLogout = () => signOut(auth);

// --- 2. DATA REALTIME ---
const subscribeToData = () => {
  const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    leads.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().createdAt?.toDate() || new Date()
    }));
  });
};

// --- 3. ANALÍTICA AVANZADA (Mantenemos tu lógica previa) ---
const patientPersona = computed(() => {
  const diagnosisLeads = leads.value.filter(l => l.type === 'diagnosis');
  if (diagnosisLeads.length === 0) return null;
  const ages = {}; const genders = {}; const services = {};
  diagnosisLeads.forEach(l => {
    const age = l.data.ageRange || 'N/A'; ages[age] = (ages[age] || 0) + 1;
    const gen = l.data.gender || 'N/A'; genders[gen] = (genders[gen] || 0) + 1;
    const srv = l.data.treatmentRecommended || 'General'; services[srv] = (services[srv] || 0) + 1;
  });
  const topAge = Object.entries(ages).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/D';
  const topGender = Object.entries(genders).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/D';
  const topService = Object.entries(services).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/D';
  return { age: topAge, gender: topGender, service: topService, count: diagnosisLeads.length };
});

const dailyStats = computed(() => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);
  const leadsToday = leads.value.filter(l => l.date >= startOfToday).length;
  const leadsYesterday = leads.value.filter(l => l.date >= startOfYesterday && l.date < startOfToday).length;
  let percent = 0;
  if (leadsYesterday > 0) percent = Math.round(((leadsToday - leadsYesterday) / leadsYesterday) * 100);
  else if (leadsToday > 0) percent = 100;
  return { today: leadsToday, yesterday: leadsYesterday, percent, trend: percent >= 0 ? 'up' : 'down' };
});

const hourlyDistribution = computed(() => {
  const hours = Array(24).fill(0);
  leads.value.forEach(lead => hours[lead.date.getHours()]++);
  const maxCount = Math.max(...hours) || 1;
  const peakIndex = hours.indexOf(maxCount);
  return {
    data: hours.map((c, i) => ({ hour: i, height: Math.round((c / maxCount) * 100), isPeak: c === maxCount && c > 0 })),
    peakLabel: `${peakIndex}:00 - ${peakIndex+1}:00`
  };
});

const healthScore = computed(() => {
  if (leads.value.length === 0) return 0;
  let score = 50; 
  score += Math.min(dailyStats.value.today * 5, 20);
  const oldPending = leads.value.filter(l => l.status === 'nuevo' && l.type === 'contact' && (new Date() - l.date) > 86400000).length;
  score -= (oldPending * 5); 
  const managedRate = leads.value.filter(l => l.status !== 'nuevo').length / leads.value.length;
  score += (managedRate * 30);
  return Math.max(0, Math.min(100, Math.round(score)));
});

const smartTips = computed(() => {
  const tips = [];
  const pending = leads.value.filter(l => l.status === 'nuevo' && l.type === 'contact');
  if (patientPersona.value) {
    tips.push({ icon: '🎯', title: 'Público Objetivo', text: `Mayoría: ${patientPersona.value.gender}s de ${patientPersona.value.age} años. Enfoca tus anuncios aquí.` });
  }
  if (dailyStats.value.trend === 'down' && dailyStats.value.today === 0) {
    tips.push({ icon: '📢', title: 'Reactiva tu Audiencia', text: 'Hoy está tranquilo. Sube una historia con encuesta.' });
  }
  const oldOnes = pending.filter(l => (new Date() - l.date) > 86400000).length;
  if (oldOnes > 0) {
    tips.push({ icon: '🚨', title: 'Atención Requerida', text: `Tienes ${oldOnes} mensajes esperando hace +24h. Priorízalos hoy.` });
  }
  return tips.slice(0, 3);
});

// --- 4. GESTIÓN DE LISTAS (Lógica Nueva) ---
const visibleLeads = computed(() => {
  const currentTab = activeTab.value;
  let filtered = leads.value.filter(l => l.type === currentTab);

  if (currentTab === 'contact') {
    // PESTAÑA CONTACTO: Filtros completos y paginación
    if (filterStatus.value !== 'all') {
      filtered = filtered.filter(l => l.status === filterStatus.value);
    }
    return filtered.slice(0, displayLimit.value);
  } else {
    // PESTAÑA DIAGNÓSTICO: Solo los últimos 10, sin filtros de estado
    return filtered.slice(0, 10);
  }
});

// --- 5. FUNCIONES OPERATIVAS ---
const loadReportConfig = () => { onSnapshot(doc(db, "config", "reports"), (s) => reportConfig.value = s.exists() ? s.data() : { frequency: 'weekly', email: user.value.email, active: false }); };
const saveReportConfig = async () => { try { await setDoc(doc(db, "config", "reports"), reportConfig.value); alert("Guardado."); } catch (e) { console.error(e); } };
const sendReportNow = async () => { if (!reportConfig.value.email) return alert("Falta email."); sendingReport.value = true; try { const f = getFunctions(app); const res = await httpsCallable(f, 'sendReport')({ period: reportConfig.value.frequency, emailTarget: reportConfig.value.email }); alert(`Enviado: ${res.data.count} registros.`); } catch (e) { alert(e.message); } finally { sendingReport.value = false; } };
const toggleStatus = async (l) => updateDoc(doc(db, "leads", l.id), { status: l.status === 'nuevo' ? 'contactado' : 'nuevo' });
const deleteLead = async (id) => { if(confirm("¿Eliminar permanentemente?")) await deleteDoc(doc(db, "leads", id)); };
const saveNote = async (l) => { if(noteBuffer.value) { await updateDoc(doc(db, "leads", l.id), { notes: noteBuffer.value }); alert('Nota guardada'); }};
const toggleExpand = (l) => { expandedLeadId.value = expandedLeadId.value === l.id ? null : l.id; noteBuffer.value = l.notes || ''; };
const formatDate = (d) => new Intl.DateTimeFormat('es-CL', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' }).format(d);
</script>

<template>
  <div class="min-h-screen bg-[#09090b] text-gray-200 font-sans selection:bg-clinic-gold selection:text-black pt-24 pb-12">
    
    <div v-if="!user" class="flex items-center justify-center min-h-[60vh] px-4">
      <div class="w-full max-w-sm bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl animate-fade-in">
        <h2 class="text-2xl font-serif italic text-clinic-gold text-center mb-6">Staff Access</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <input v-model="email" type="email" placeholder="Usuario" class="input-field">
          <input v-model="password" type="password" placeholder="Contraseña" class="input-field">
          <p v-if="errorMsg" class="text-red-400 text-xs text-center">{{ errorMsg }}</p>
          <button :disabled="loading" class="btn-primary w-full">{{ loading ? '...' : 'Entrar' }}</button>
        </form>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      <header class="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 class="text-3xl font-bold text-white flex items-center gap-3">
            Dashboard Clínico
            <span class="text-xs px-2 py-1 rounded border border-white/20" 
                  :class="healthScore > 70 ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'">
              Score: {{ healthScore }}/100
            </span>
          </h1>
          <p class="text-gray-400 text-sm mt-1">Gestión de contactos y analítica IA.</p>
        </div>
        <button @click="handleLogout" class="text-xs text-red-400 border border-red-400/20 px-3 py-1 rounded hover:bg-red-400/10">Cerrar Sesión</button>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-[#121212] to-black border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 class="text-xs font-bold uppercase text-gray-500 tracking-wider">Tráfico Diario</h3>
            <div class="flex items-baseline gap-3 my-2">
              <span class="text-5xl font-bold text-white">{{ dailyStats.today }}</span>
              <span class="text-sm font-medium text-gray-400">Leads Hoy</span>
            </div>
            <div class="flex items-center gap-2 text-xs" :class="dailyStats.trend === 'up' ? 'text-green-400' : 'text-red-400'">
              <span class="bg-white/5 px-2 py-0.5 rounded">Vs. Ayer ({{ dailyStats.yesterday }})</span>
              <span>{{ dailyStats.trend === 'up' ? '▲' : '▼' }} {{ dailyStats.percent }}%</span>
            </div>
          </div>
        </div>
        <div class="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 relative">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xs font-bold uppercase text-gray-500 tracking-wider">Actividad por Hora</h3>
              <p class="text-xs text-gray-300 mt-1">Hora pico: <span class="text-clinic-gold font-bold">{{ hourlyDistribution.peakLabel }}</span></p>
            </div>
          </div>
          <div class="flex items-end justify-between h-20 gap-1 w-full">
            <div v-for="bar in hourlyDistribution.data" :key="bar.hour" 
                 class="w-full bg-white/10 hover:bg-clinic-gold/50 rounded-t-sm transition-all relative group"
                 :class="bar.isPeak && 'bg-clinic-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]'"
                 :style="{ height: Math.max(10, bar.height) + '%' }">
                 <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                   {{ bar.hour }}:00
                 </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-[#151518] border border-white/10 rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-6">
            <span class="bg-purple-500/20 text-purple-400 p-2 rounded-lg text-lg">👤</span>
            <h3 class="text-lg font-bold text-white">Perfil del Paciente (IA)</h3>
          </div>
          <div v-if="patientPersona" class="grid grid-cols-3 gap-4">
            <div class="text-center p-3 bg-white/5 rounded-xl border border-white/5">
              <p class="text-[10px] uppercase text-gray-500 mb-1">Rango Edad</p>
              <p class="text-xl font-bold text-white">{{ patientPersona.age }}</p>
            </div>
            <div class="text-center p-3 bg-white/5 rounded-xl border border-white/5">
              <p class="text-[10px] uppercase text-gray-500 mb-1">Género</p>
              <p class="text-xl font-bold text-white capitalize">{{ patientPersona.gender }}</p>
            </div>
            <div class="text-center p-3 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
              <p class="text-[10px] uppercase text-gray-500 mb-1">Interés Top</p>
              <p class="text-sm font-bold text-clinic-gold leading-tight">{{ patientPersona.service }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500 text-sm">Esperando datos de diagnóstico...</div>
        </div>
        <div class="bg-[#151518] border border-clinic-gold/20 rounded-2xl p-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-5 text-9xl">🧠</div>
          <div class="flex items-center gap-2 mb-4">
             <span class="bg-clinic-gold/20 text-clinic-gold p-2 rounded-lg text-lg">💡</span>
             <h3 class="text-lg font-bold text-white">Coach Virtual</h3>
          </div>
          <div class="space-y-3 relative z-10">
            <div v-for="(tip, i) in smartTips" :key="i" class="flex gap-3 items-start p-3 rounded-lg bg-black/40 border border-white/5">
              <span class="text-xl shrink-0">{{ tip.icon }}</span>
              <div>
                <h4 class="text-sm font-bold text-gray-200">{{ tip.title }}</h4>
                <p class="text-xs text-gray-500">{{ tip.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="flex flex-col md:flex-row justify-between items-end mb-4 border-b border-white/10">
          <div class="flex gap-6">
            <button @click="activeTab = 'contact'; displayLimit = 15" 
                    class="pb-4 text-sm font-bold tracking-wide transition-colors relative"
                    :class="activeTab === 'contact' ? 'text-white' : 'text-gray-500 hover:text-gray-300'">
              Mensajes Directos
              <span v-if="activeTab === 'contact'" class="absolute bottom-0 left-0 w-full h-0.5 bg-clinic-gold"></span>
            </button>
            <button @click="activeTab = 'diagnosis'"
                    class="pb-4 text-sm font-bold tracking-wide transition-colors relative"
                    :class="activeTab === 'diagnosis' ? 'text-white' : 'text-gray-500 hover:text-gray-300'">
              Diagnósticos IA (Analytics)
              <span v-if="activeTab === 'diagnosis'" class="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"></span>
            </button>
          </div>

          <div v-if="activeTab === 'contact'" class="flex bg-white/5 p-1 rounded-lg mb-2">
            <button @click="filterStatus = 'all'" :class="['filter-btn', filterStatus === 'all' && 'active']">Todos</button>
            <button @click="filterStatus = 'nuevo'" :class="['filter-btn', filterStatus === 'nuevo' && 'active']">Pendientes</button>
            <button @click="filterStatus = 'contactado'" :class="['filter-btn', filterStatus === 'contactado' && 'active']">Listos</button>
          </div>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-h-[300px]">
          <div v-if="visibleLeads.length === 0" class="p-12 text-center text-gray-500">
            {{ activeTab === 'contact' ? 'No hay mensajes.' : 'No hay diagnósticos recientes.' }}
          </div>

          <div v-else class="divide-y divide-white/5">
            <div v-for="lead in visibleLeads" :key="lead.id" 
                 class="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                 @click="toggleExpand(lead)">
                
                <div class="p-5 flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div class="shrink-0 pt-1 md:pt-0">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg border border-white/5"
                         :class="lead.type === 'contact' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'">
                      {{ lead.type === 'contact' ? '✉️' : '✨' }}
                    </div>
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="text-white font-bold truncate">
                        {{ lead.data.name || 'Paciente IA' }} 
                        <span v-if="!lead.data.name" class="font-normal text-gray-500 text-xs">({{ lead.data.gender }} {{ lead.data.ageRange }})</span>
                      </h4>
                      <span v-if="lead.type === 'contact' && lead.status === 'nuevo' && (new Date() - lead.date) > 86400000" class="badge-red">+24h</span>
                      <span v-if="lead.notes" class="badge-gray">Nota</span>
                    </div>
                    <p class="text-sm text-clinic-gold mb-0.5 truncate">
                      {{ lead.type === 'contact' ? lead.data.service : lead.data.treatmentRecommended }}
                    </p>
                    <p class="text-xs text-gray-500 flex gap-2">
                      <span>{{ formatDate(lead.date) }}</span>
                      <span v-if="lead.type === 'diagnosis'">• {{ lead.data.zoneLabel }}</span>
                    </p>
                  </div>

                  <div class="flex items-center gap-2 mt-2 md:mt-0 justify-end w-full md:w-auto" @click.stop>
                    <button v-if="activeTab === 'diagnosis'" @click="deleteLead(lead.id)" class="text-gray-500 hover:text-red-400 p-2">🗑️</button>

                    <template v-if="activeTab === 'contact'">
                      <a v-if="lead.data.phone" :href="`https://wa.me/${lead.data.phone}`" target="_blank" class="action-btn text-green-400 hover:bg-green-500/10" title="WhatsApp">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                      </a>
                      <button @click="toggleStatus(lead)" class="action-btn" :class="lead.status === 'nuevo' ? 'text-yellow-400' : 'text-green-400 bg-green-500/5'">
                        {{ lead.status === 'nuevo' ? '⏳' : '✅' }}
                      </button>
                      <span class="text-gray-600 text-[10px] ml-2 transform transition-transform" :class="expandedLeadId === lead.id && 'rotate-180'">▼</span>
                    </template>
                  </div>
                </div>

                <div v-if="expandedLeadId === lead.id && activeTab === 'contact'" class="bg-black/20 border-t border-white/5 p-6 cursor-default" @click.stop>
                  <div class="grid md:grid-cols-2 gap-8">
                    <div class="text-sm text-gray-400 space-y-3">
                       <h5 class="text-white font-bold text-xs uppercase mb-2">Ficha del Contacto</h5>
                       <div class="flex gap-2"><span class="w-4">📧</span> {{ lead.data.email }}</div>
                       <div class="flex gap-2"><span class="w-4">📞</span> {{ lead.data.phone }}</div>
                       <div class="bg-white/5 p-3 rounded border-l-2 border-clinic-gold italic text-white/80">"{{ lead.data.message }}"</div>
                       <button @click="deleteLead(lead.id)" class="text-red-400 text-xs mt-4 hover:text-red-300 flex items-center gap-1">🗑️ Borrar</button>
                    </div>
                    <div class="bg-white/5 p-4 rounded-xl border border-white/5">
                      <h5 class="text-clinic-gold font-bold text-xs uppercase mb-2">Bitácora</h5>
                      <textarea v-model="noteBuffer" rows="3" class="input-field mb-2 text-sm" placeholder="Notas de seguimiento..."></textarea>
                      <div class="flex justify-end"><button @click="saveNote(lead)" class="bg-clinic-gold text-black text-xs font-bold py-2 px-4 rounded hover:bg-yellow-500">Guardar</button></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div v-if="activeTab === 'contact' && leads.filter(l => l.type === 'contact').length > visibleLeads.length" class="p-4 text-center border-t border-white/5">
            <button @click="displayLimit += 15" class="text-xs text-gray-400 hover:text-white uppercase tracking-widest font-bold">Cargar más</button>
          </div>
          <div v-if="activeTab === 'diagnosis'" class="p-2 text-center text-[10px] text-gray-600 uppercase tracking-wider">
            Mostrando los últimos 10 diagnósticos
          </div>
        </div>
      </section>

      <section class="border-t border-white/10 pt-8 pb-8 flex flex-col md:flex-row gap-6">
        <div class="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div><p class="text-sm font-bold text-gray-300">Reporte Automático</p><p class="text-xs text-gray-500">{{ reportConfig.active ? 'Activo: ' + reportConfig.frequency : 'Inactivo' }}</p></div>
            <button @click="reportConfig.active = !reportConfig.active" class="w-10 h-5 rounded-full relative transition-colors" :class="reportConfig.active ? 'bg-green-500' : 'bg-gray-600'"><span class="absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform" :class="reportConfig.active && 'translate-x-5'"></span></button>
        </div>
        <div v-if="reportConfig.active" class="flex-1 flex gap-2">
           <select v-model="reportConfig.frequency" class="input-field text-xs"><option value="weekly">Semanal</option><option value="monthly">Mensual</option></select>
           <input v-model="reportConfig.email" type="email" placeholder="Email reporte" class="input-field text-xs">
           <button @click="saveReportConfig" class="text-xs bg-white/10 px-3 rounded hover:bg-white/20">💾</button>
        </div>
        <button @click="sendReportNow" :disabled="sendingReport" class="flex-1 border border-clinic-gold/30 text-clinic-gold hover:bg-clinic-gold hover:text-black py-2 rounded-lg text-xs font-bold transition-all">{{ sendingReport ? 'Enviando...' : '📤 Enviar Reporte Ahora' }}</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
.input-field { @apply w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-clinic-gold outline-none transition-all; }
.btn-primary { @apply bg-clinic-gold text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-all; }
.filter-btn { @apply px-4 py-1.5 text-xs font-medium rounded-md transition-all text-gray-500; }
.filter-btn.active { @apply bg-white/10 text-white shadow-sm; }
.action-btn { @apply p-2 rounded-lg border border-white/10 hover:border-white/30 transition-all flex items-center gap-2 text-xs font-bold; }
.badge-red { @apply text-[9px] bg-red-500/20 text-red-400 px-1.5 rounded border border-red-500/20; }
.badge-gray { @apply text-[9px] bg-gray-700 text-gray-300 px-1.5 rounded; }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>