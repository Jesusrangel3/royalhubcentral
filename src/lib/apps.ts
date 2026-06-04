import { ShoppingCart, Truck, Heart, Wrench, ShieldCheck, MapPin, Thermometer, type LucideIcon } from "lucide-react";

export type AppId = "procure" | "fleet" | "operator" | "maintenance" | "safety" | "pemex" | "temperature"  | "CDMV"  | ""  | "Gantt" ;

export type AppMeta = {
  id: AppId;
  name: string;
  shortName: string;
  category: string;
  Icon: LucideIcon;
  description: string;
  url: string;
  /** Likely to refuse iframe embedding (X-Frame-Options/CSP). */
  embedRisk?: boolean;
};

export const apps: AppMeta[] = [
  {
    id: "procure",
    name: "Procure to Pay (P2P)",
    shortName: "P2P",
    category: "P2P",
    Icon: ShoppingCart,
    description:
      "Módulo Procure to Pay para comprobación de facturas, solicitudes de vales, control de folios y presupuestos. Incluye IA para validación y portal de proveedores para carga de facturas.",
    url: "https://smart-procure-ui.lovable.app",
  },
  {
    id: "fleet",
    name: "Gemelos Digitales — Vehículo",
    shortName: "Flota",
    category: "FLOTA",
    Icon: Truck,
    description:
      "Gemelo digital 3D de tractocamiones integrado con Samsara. IA predictiva con códigos de falla y muestras de aceite. Clasifica unidades por riesgo y tiempo estimado de falla.",
    url: "https://gemelos-digitales.lovable.app",
  },
  {
    id: "operator",
    name: "Digital Operator Heart",
    shortName: "Operadores",
    category: "OPERADORES",
    Icon: Heart,
    description:
      "Gemelo digital del operador con indicadores operativos, médicos y familiares. IA predictiva para garantizar bienestar y retención del operador a largo plazo.",
    url: "https://digital-operator-heart.lovable.app",
  },
  {
    id: "maintenance",
    name: "Dashboard Órdenes de Trabajo",
    shortName: "Mantenimiento",
    category: "MANTENIMIENTO",
    Icon: Wrench,
    description:
      "Control de gasto en refacciones por área, programación de mantenimientos, resúmenes por mes/día, costos totales y alertas por registros incorrectos.",
    url: "https://mtto.royal-transports.com/",
    embedRisk: true,
  },
  {
    id: "safety",
    name: "Indicadores de Seguridad",
    shortName: "Seguridad",
    category: "SEGURIDAD",
    Icon: ShieldCheck,
    description:
      "Análisis y clasificación de eventos de seguridad enviados por Samsara (somnolencia, uso de celular, sin cinturón, etc.) con indicadores por operador.",
    url: "https://indicadores-seguridad.lovable.app",
  },
  {
    id: "pemex",
    name: "Tablero PEMEX — Monitoreo de Embarques",
    shortName: "PEMEX",
    category: "CLIENTES",
    Icon: MapPin,
    description:
      "Plataforma dedicada al cliente PEMEX para monitoreo en tiempo real de embarques: ubicación, tiempos de carga y descarga, y estatus operativo.",
    url: "https://tablerovjs.lovable.app",
  },
  {
    id: "temperature",
    name: "Monitor de Temperaturas — Cajas Refrigeradas",
    shortName: "Temperatura",
    category: "CADENA DE FRÍO",
    Icon: Thermometer,
    description:
      "Monitoreo en tiempo real de temperaturas de cajas refrigeradas. Alertas por desviaciones, históricos por unidad y reportes de cumplimiento para cargas sensibles.",
    url: "https://monitor-temperatura.royal-transports.com",
    embedRisk: true,
  },
  {
    id: "CDMV",
    name: "Control Digital de Mantenimiento Vehicular",
    shortName: "CDMV",
    category: "MANTENIMIENTO",
    Icon: Thermometer,
    description:
      "Sistema de control digital para mantenimiento vehicular",
    url: "https://c-d-m-v.lovable.app",
    embedRisk: true,
  },
  {
    id: "Gantt",
    name: "Planificación Gantt",
    shortName: "Gantt",
    category: "PROYECTOS",
    Icon: MapPin,
    description:
      "Sistema de planificación Gantt para gestión de proyectos. Visualización de tareas, dependencias y cronogramas",
    url: "https://gantt.lovable.app",
    embedRisk: true,
  }
];

export function getApp(id: string): AppMeta | undefined {
  return apps.find((a) => a.id === id);
}