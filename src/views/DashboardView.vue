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
const filterStatus = ref('all');
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

// --- 3. MOTOR INTELIGENTE (COACH LOGIC) ---

// A. Estadísticas de Progresión (48h)
const progressionStats = computed(() => {
  const now = new Date();
  const ms48h = 48 * 60 * 60 * 1000;
  const last48h = leads.value.filter(l => (now - l.date) < ms48h);
  const prev48h = leads.value.filter(l => (now - l.date) >= ms48h && (now - l.date) < (ms48h * 2));
  
  const current = last48h.length;
  const previous = prev48h.length;
  let percent = previous > 0 ? Math.round(((current - previous) / previous) * 100) : (current > 0 ? 100 : 0);

  return { current, previous, percent, trend: percent >= 0 ? 'up' : 'down' };
});

// B. Tratamientos Top
const topTreatments = computed(() => {
  const counts = {};
  leads.value.forEach(lead => {
    const name = lead.type === 'contact' ? lead.data.service : lead.data.treatmentRecommended;
    if (name) counts[name] = (counts[name] || 0) + 1;
  });
  return Object.entries(counts).sort(([,a], [,b]) => b - a)
    .map(([name, count]) => ({ name, count, percent: Math.round((count / leads.value.length) * 100) }));
});

// C. HEALTH SCORE (Puntaje del Negocio 0-100)
const healthScore = computed(() => {
  if (leads.value.length === 0) return 0;
  
  let score = 50; // Base
  
  // Factor 1: Volumen reciente (Max 20 pts)
  score += Math.min(progressionStats.value.current * 4, 20);
  
  // Factor 2: Tiempo de respuesta (Max 30 pts)
  // Penaliza si hay muchos "nuevos" antiguos
  const oldPending = leads.value.filter(l => {
    const hoursAgo = (new Date() - l.date) / (1000 * 60 * 60);
    return l.status === 'nuevo' && hoursAgo > 24;
  }).length;
  score -= (oldPending * 5);

  // Factor 3: Tasa de Gestión (Max 20 pts)
  const total = leads.value.length;
  const managed = leads.value.filter(l => l.status !== 'nuevo').length;
  const rate = total > 0 ? managed / total : 0;
  score += (rate * 20);

  return Math.max(0, Math.min(100, Math.round(score)));
});

// D. GENERADOR DE TIPS (El Cerebro)
const smartTips = computed(() => {
  const tips = [];
  const { current, trend } = progressionStats.value;
  const pendingLeads = leads.value.filter(l => l.status === 'nuevo');
  const oldPending = pendingLeads.filter(l => (new Date() - l.date) / 36e5 > 24).length;
  const topService = topTreatments.value[0];

  // 1. TACTICA DE VENTAS (Si hay Leads viejos)
  if (oldPending > 0) {
    tips.push({
      type: 'urgente',
      icon: '🚨',
      title: 'Fuga de Dinero Detectada',
      text: `Tienes ${oldPending} clientes esperando hace más de 24hrs. Tu probabilidad de venta cae un 10% por cada hora. ¡Llámalos ya!`
    });
  }

  // 2. ESTRATEGIA DE MARKETING (Scripts)
  if (topService) {
    tips.push({
      type: 'marketing',
      icon: '🎥',
      title: `Idea Viral: ${topService.name}`,
      text: `El ${topService.percent}% quiere esto. Graba un video diciendo: "3 Mitos sobre ${topService.name} que te impiden tener el resultado que quieres".`
    });
  }

  // 3. CONSEJO DE ENGAGEMENT (Si el tráfico baja)
  if (current === 0 || trend === 'down') {
    tips.push({
      type: 'accion',
      icon: '🎣',
      title: 'Pesca de Pacientes',
      text: 'El tráfico está bajo. Sube una foto de un resultado increíble a tus Estados de WhatsApp e Instagram con el texto: "Solo 2 cupos para evaluación esta semana".'
    });
  }

  // 4. CONSEJO SEGÚN DIA DE LA SEMANA
  const day = new Date().getDay(); // 0 Dom, 1 Lun...
  if (day === 1) { // Lunes
    tips.push({ type: 'info', icon: '📅', title: 'Planificación Semanal', text: 'Revisa los leads del fin de semana. Los que escriben Domingo noche suelen tener alta intención de compra.' });
  } else if (day === 5) { // Viernes
    tips.push({ type: 'info', icon: '🥂', title: 'Cierre de Semana', text: 'Manda un mensaje a los pendientes: "Hola, estoy cerrando agenda para la próxima semana, ¿te reservo el cupo?".' });
  }

  return tips.slice(0, 4);
});


// --- 4. FUNCIONES GESTIÓN ---
const loadReportConfig = () => {
  onSnapshot(doc(db, "config", "reports"), (s) => reportConfig.value = s.exists() ? s.data() : { frequency: 'weekly', email: user.value.email, active: false });
};
const saveReportConfig = async () => {
  try { await setDoc(doc(db, "config", "reports"), reportConfig.value); alert("Guardado."); } catch (e) { console.error(e); }
};
const sendReportNow = async () => {
  if (!reportConfig.value.email) return alert("Falta email.");
  sendingReport.value = true;
  try {
    const f = getFunctions(app);
    const res = await httpsCallable(f, 'sendReport')({ period: reportConfig.value.frequency, emailTarget: reportConfig.value.email });
    alert(`Enviado: ${res.data.count} registros.`);
  } catch (e) { alert(e.message); } finally { sendingReport.value = false; }
};

// Helpers Visuales
const visibleLeads = computed(() => {
  let f = leads.value;
  if (filterStatus.value !== 'all') f = f.filter(l => l.status === filterStatus.value);
  return f.slice(0, displayLimit.value);
});
const toggleStatus = async (l) => updateDoc(doc(db, "leads", l.id), { status: l.status === 'nuevo' ? 'contactado' : 'nuevo' });
const deleteLead = async (id) => { if(confirm("¿Eliminar?")) await deleteDoc(doc(db, "leads", id)); };
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
      
      <header class="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-white flex items-center gap-3">
            Hola, Equipo
            <span class="text-xs px-2 py-1 rounded border border-white/20" 
                  :class="healthScore > 70 ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'">
              Health Score: {{ healthScore }}/100
            </span>
          </h1>
          <p class="text-gray-400 text-sm mt-1">Tu clínica está funcionando al {{ healthScore }}% de su potencial digital hoy.</p>
        </div>
        <button @click="handleLogout" class="text-xs text-red-400 border border-red-400/20 px-3 py-1 rounded hover:bg-red-400/10">Cerrar Sesión</button>
      </header>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div class="lg:col-span-4 space-y-4">
          <div class="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 p-6 rounded-2xl relative group overflow-hidden">
            <div class="absolute right-0 top-0 p-4 opacity-5 text-8xl group-hover:opacity-10 transition-opacity">📈</div>
            <p class="text-xs uppercase font-bold text-gray-400 mb-2">Leads (48 hrs)</p>
            <div class="flex items-end gap-3">
              <h2 class="text-5xl font-bold text-white">{{ progressionStats.current }}</h2>
              <div class="mb-2 text-sm font-bold px-2 py-0.5 rounded bg-black/30" 
                   :class="progressionStats.trend === 'up' ? 'text-green-400' : 'text-red-400'">
                {{ progressionStats.trend === 'up' ? '▲' : '▼' }} {{ progressionStats.percent }}%
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white/5 border border-white/10 p-4 rounded-xl">
              <p class="text-2xl font-bold text-white">{{ leads.length }}</p>
              <p class="text-[10px] uppercase text-gray-500">Histórico</p>
            </div>
            <div class="bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden">
               <div v-if="leads.filter(l => l.status === 'nuevo').length > 0" class="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <p class="text-2xl font-bold text-yellow-400">{{ leads.filter(l => l.status === 'nuevo').length }}</p>
              <p class="text-[10px] uppercase text-gray-500">Por Atender</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 bg-[#121214] border border-clinic-gold/20 rounded-2xl p-6 relative">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-clinic-gold to-transparent opacity-50"></div>
          
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-clinic-gold/10 flex items-center justify-center text-xl">🤖</div>
            <div>
              <h3 class="text-lg font-bold text-white">Coach Virtual</h3>
              <p class="text-xs text-gray-400">Estrategias generadas por IA para hoy.</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="(tip, index) in smartTips" :key="index" 
                 class="p-4 rounded-xl border transition-all hover:bg-white/5 flex gap-3"
                 :class="tip.type === 'urgente' ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/5'">
              <span class="text-2xl shrink-0">{{ tip.icon }}</span>
              <div>
                <h4 class="text-sm font-bold mb-1" :class="tip.type === 'urgente' ? 'text-red-400' : 'text-clinic-gold'">{{ tip.title }}</h4>
                <p class="text-xs text-gray-300 leading-relaxed">{{ tip.text }}</p>
              </div>
            </div>
             <div v-if="smartTips.length === 0" class="col-span-2 text-center py-8 text-gray-500 text-sm">
               Reuniendo datos suficientes para generar consejos...
             </div>
          </div>
        </div>
      </section>

      <section>
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h3 class="text-xl font-bold text-white">Pacientes Recientes</h3>
          <div class="bg-white/5 p-1 rounded-lg flex">
            <button @click="filterStatus = 'all'" :class="['filter-tab', filterStatus === 'all' && 'active']">Todos</button>
            <button @click="filterStatus = 'nuevo'" :class="['filter-tab', filterStatus === 'nuevo' && 'active']">Pendientes</button>
            <button @click="filterStatus = 'contactado'" :class="['filter-tab', filterStatus === 'contactado' && 'active']">Listos</button>
          </div>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div class="divide-y divide-white/5">
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
                        {{ lead.data.name || `${lead.data.gender} (${lead.data.ageRange})` }}
                      </h4>
                      <span v-if="lead.status === 'nuevo' && (new Date() - lead.date) > 86400000" 
                            class="text-[9px] bg-red-500/20 text-red-400 px-1.5 rounded border border-red-500/20">
                        +24h Esperando
                      </span>
                      <span v-if="lead.notes" class="text-[9px] bg-gray-700 text-gray-300 px-1.5 rounded">Nota</span>
                    </div>
                    <p class="text-sm text-clinic-gold mb-0.5 truncate">
                      {{ lead.type === 'contact' ? lead.data.service : lead.data.treatmentRecommended }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(lead.date) }} • {{ lead.type === 'contact' ? 'Web' : 'IA' }}
                    </p>
                  </div>

                  <div class="flex items-center gap-2 mt-2 md:mt-0 justify-end w-full md:w-auto" @click.stop>
                    <a v-if="lead.data.phone" :href="`https://wa.me/${lead.data.phone}`" target="_blank" class="action-btn text-green-400 hover:bg-green-500/10" title="Abrir WhatsApp">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </a>
                    <button @click="toggleStatus(lead)" class="action-btn" :class="lead.status === 'nuevo' ? 'text-yellow-400' : 'text-green-400 bg-green-500/5'">
                      {{ lead.status === 'nuevo' ? '⏳' : '✅' }}
                    </button>
                    <span class="text-gray-600 text-[10px] ml-2 transform transition-transform" :class="expandedLeadId === lead.id && 'rotate-180'">▼</span>
                  </div>
                </div>

                <div v-if="expandedLeadId === lead.id" class="bg-black/20 border-t border-white/5 p-6 cursor-default" @click.stop>
                  <div class="grid md:grid-cols-2 gap-8">
                    <div class="text-sm text-gray-400 space-y-2">
                       <h5 class="text-white font-bold text-xs uppercase mb-3">Detalle Paciente</h5>
                       <p v-if="lead.data.email">📧 {{ lead.data.email }}</p>
                       <p v-if="lead.data.phone">📱 {{ lead.data.phone }}</p>
                       <div v-if="lead.data.message" class="bg-white/5 p-3 rounded border-l-2 border-clinic-gold">"{{ lead.data.message }}"</div>
                       
                       <div v-if="lead.type === 'diagnosis'" class="grid grid-cols-2 gap-2 mt-2">
                         <div class="bg-white/5 p-2 rounded">
                           <span class="block text-[10px] text-gray-500">Zona</span>
                           <span class="text-white">{{ lead.data.zoneLabel }}</span>
                         </div>
                         <div class="bg-white/5 p-2 rounded">
                           <span class="block text-[10px] text-gray-500">Objetivo</span>
                           <span class="text-white">{{ lead.data.intensity }}</span>
                         </div>
                       </div>
                       
                       <button @click="deleteLead(lead.id)" class="text-red-400 text-xs mt-4 hover:text-red-300 flex items-center gap-1">
                         <span class="text-lg">🗑️</span> Borrar registro permanentemente
                       </button>
                    </div>

                    <div class="bg-white/5 p-4 rounded-xl border border-white/5">
                      <h5 class="text-clinic-gold font-bold text-xs uppercase mb-2">Bitácora Interna</h5>
                      <textarea v-model="noteBuffer" rows="3" class="input-field mb-2 text-sm" placeholder="Ej: Llamé y no contestó. Volver a llamar mañana."></textarea>
                      <div class="flex justify-end">
                        <button @click="saveNote(lead)" class="bg-clinic-gold text-black text-xs font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors">Guardar Nota</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div v-if="leads.length > visibleLeads.length" class="p-4 text-center border-t border-white/5">
            <button @click="displayLimit += 15" class="text-xs text-gray-400 hover:text-white uppercase tracking-widest font-bold">Cargar más registros</button>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10 pt-8">
        <h3 class="text-lg font-bold text-white mb-6">Configuración y Reportes</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/5 border border-white/10 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-bold text-gray-300">Reporte Automático</span>
              <button @click="reportConfig.active = !reportConfig.active" 
                      class="w-10 h-5 rounded-full relative transition-colors"
                      :class="reportConfig.active ? 'bg-green-500' : 'bg-gray-600'">
                <span class="absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform" 
                      :class="reportConfig.active && 'translate-x-5'"></span>
              </button>
            </div>
            <div v-if="reportConfig.active" class="space-y-3 animate-fade-in">
              <select v-model="reportConfig.frequency" class="input-field text-sm">
                <option value="weekly">Semanal (Lunes)</option>
                <option value="monthly">Mensual (Día 1)</option>
              </select>
              <input v-model="reportConfig.email" type="email" placeholder="Email destino" class="input-field text-sm">
              <button @click="saveReportConfig" class="text-xs text-clinic-gold hover:underline w-full text-right">Guardar cambios</button>
            </div>
          </div>

          <div class="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
             <button @click="sendReportNow" :disabled="sendingReport" 
                    class="w-full border border-clinic-gold/30 text-clinic-gold hover:bg-clinic-gold hover:text-black py-3 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2">
              <span v-if="sendingReport" class="animate-spin">⏳</span>
              <span>{{ sendingReport ? 'Generando Excel...' : '📤 Enviar Reporte de Prueba Ahora' }}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.input-field { @apply w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-clinic-gold outline-none transition-all; }
.btn-primary { @apply bg-clinic-gold text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-all; }
.filter-tab { @apply px-4 py-1.5 text-xs font-medium rounded-md transition-all text-gray-500; }
.filter-tab.active { @apply bg-white/10 text-white shadow-sm; }
.action-btn { @apply p-2 rounded-lg border border-white/10 hover:border-white/30 transition-all flex items-center gap-2 text-xs font-bold; }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>