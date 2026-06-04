// Mock stats for the Hub home dashboard.
//
// Each sub-app should eventually expose a public endpoint:
//   GET https://<sub-app>.lovable.app/api/public/hub-stats
// returning shape:
//   { metrics: { label: string; value: number | string; trend?: number[] }[] }
//
// When those endpoints exist, swap getHubStats() below to fetch them in
// parallel. Until then, we generate realistic-looking values that jitter
// each call so the dashboard feels alive.

import type { AppId } from "@/lib/apps";

export type Metric = { label: string; value: string; trend: number[] };
export type AppStats = { live: boolean; metrics: Metric[] };
export type HubStats = {
  globals: { activeShipments: number; pendingPOs: number; operatorsOnRoute: number; criticalAlerts: number };
  apps: Record<AppId, AppStats>;
  activity: { id: string; time: string; app: AppId; text: string }[];
};

function jitter(base: number, spread: number) {
  return Math.max(0, Math.round(base + (Math.random() - 0.5) * spread));
}
function trend(base: number, n = 12, spread = 0.4) {
  return Array.from({ length: n }, (_, i) => base * (1 + (Math.sin(i / 2 + Math.random()) * spread)));
}

export async function getHubStats(): Promise<HubStats> {
  // Simulated network latency
  await new Promise((r) => setTimeout(r, 120));
  return {
    globals: {
      activeShipments: jitter(237, 18),
      pendingPOs: jitter(42, 8),
      operatorsOnRoute: jitter(184, 12),
      criticalAlerts: jitter(3, 4),
    },
    apps: {
      procure: {
        live: false,
        metrics: [
          { label: "Folios abiertos", value: String(jitter(42, 6)), trend: trend(40) },
          { label: "Vales del día", value: String(jitter(118, 10)), trend: trend(110) },
          { label: "Facturas en revisión", value: String(jitter(27, 4)), trend: trend(25) },
        ],
      },
      fleet: {
        live: false,
        metrics: [
          { label: "Tractos activos", value: String(jitter(146, 6)), trend: trend(140) },
          { label: "Riesgo alto", value: String(jitter(9, 3)), trend: trend(8) },
          { label: "Salud promedio", value: `${jitter(87, 4)}%`, trend: trend(85) },
        ],
      },
      operator: {
        live: false,
        metrics: [
          { label: "Operadores activos", value: String(jitter(184, 8)), trend: trend(180) },
          { label: "Bienestar prom.", value: `${jitter(82, 5)}%`, trend: trend(80) },
          { label: "Retención YTD", value: `${jitter(91, 2)}%`, trend: trend(91) },
        ],
      },
      maintenance: {
        live: false,
        metrics: [
          { label: "OT abiertas", value: String(jitter(34, 6)), trend: trend(32) },
          { label: "Costo del mes", value: `$${jitter(1240, 80)}K`, trend: trend(1240) },
          { label: "Programadas hoy", value: String(jitter(12, 3)), trend: trend(11) },
        ],
      },
      safety: {
        live: false,
        metrics: [
          { label: "Eventos hoy", value: String(jitter(28, 6)), trend: trend(27) },
          { label: "Críticos", value: String(jitter(2, 2)), trend: trend(2) },
          { label: "Score flota", value: `${jitter(94, 3)}`, trend: trend(94) },
        ],
      },
      pemex: {
        live: false,
        metrics: [
          { label: "Embarques activos", value: String(jitter(58, 5)), trend: trend(56) },
          { label: "En carga", value: String(jitter(11, 3)), trend: trend(10) },
          { label: "En descarga", value: String(jitter(9, 3)), trend: trend(9) },
        ],
      },
      temperature: {
        live: false,
        metrics: [
          { label: "Cajas activas", value: String(jitter(94, 6)), trend: trend(92) },
          { label: "Alertas frío", value: String(jitter(2, 2)), trend: trend(2) },
          { label: "Temp prom. °C", value: String(jitter(-18, 3)), trend: trend(-18) },
        ],
      },
      CDMV: {
        live: false,
        metrics: [
          { label: "Órdenes activas", value: String(jitter(15, 3)), trend: trend(14) },
          { label: "Preventivos hoy", value: String(jitter(4, 2)), trend: trend(3) },
          { label: "En taller", value: String(jitter(8, 2)), trend: trend(7) },
        ],
      },
      Gantt: {
        live: false,
        metrics: [
          { label: "Proyectos", value: String(jitter(6, 1)), trend: trend(5) },
          { label: "Tareas atrasadas", value: String(jitter(2, 1)), trend: trend(2) },
          { label: "Hitos completados", value: `${jitter(88, 5)}%`, trend: trend(85) },
        ],
      },
    },
    activity: [
      { id: "1", time: "hace 2 min", app: "pemex", text: "Embarque PMX-4421 inició descarga en Salina Cruz" },
      { id: "2", time: "hace 7 min", app: "fleet", text: "T-118 elevó score de riesgo a Alto (códigos P0420 + P0171)" },
      { id: "3", time: "hace 12 min", app: "procure", text: "OC #4592 aprobada por Dir. Operaciones" },
      { id: "4", time: "hace 18 min", app: "safety", text: "Evento de somnolencia detectado — Operador #882" },
      { id: "5", time: "hace 25 min", app: "maintenance", text: "OT #1207 cerrada — cambio de balatas T-067" },
      { id: "6", time: "hace 31 min", app: "operator", text: "Operador #441 completó chequeo médico mensual" },
    ],
  };
}