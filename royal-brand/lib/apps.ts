import { ShoppingCart, Truck, Heart, Wrench, Thermometer, type LucideIcon } from "lucide-react";

export type AppId = "procure" | "fleet" | "operator" | "maintenance" | "temperature";

export type AppMeta = {
  id: AppId;
  name: string;
  shortName: string;
  category: string;
  Icon: LucideIcon;
  url: string;
};

export const apps: Record<AppId, AppMeta> = {
  procure: {
    id: "procure",
    name: "Smart Procure",
    shortName: "Compras",
    category: "COMPRAS",
    Icon: ShoppingCart,
    url: "https://smart-procure-ui.lovable.app",
  },
  fleet: {
    id: "fleet",
    name: "Gemelos Digitales — Vehículo",
    shortName: "Flota",
    category: "FLOTA",
    Icon: Truck,
    url: "https://gemelos-digitales.lovable.app",
  },
  operator: {
    id: "operator",
    name: "Digital Operator Heart",
    shortName: "Operadores",
    category: "OPERADORES",
    Icon: Heart,
    url: "https://digital-operator-heart.lovable.app",
  },
  maintenance: {
    id: "maintenance",
    name: "Dashboard Órdenes de Trabajo",
    shortName: "Mantenimiento",
    category: "MANTENIMIENTO",
    Icon: Wrench,
    url: "https://mtto.royal-transports.com/",
  },
  temperature: {
    id: "temperature",
    name: "Monitor de Temperaturas",
    shortName: "Temperatura",
    category: "CADENA DE FRÍO",
    Icon: Thermometer,
    url: "https://monitor-temperatura.royal-transports.com",
  },
};