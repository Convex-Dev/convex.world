import {
  Shield, Database, HardDrive, Cpu, Network, GitMerge, Layers, FileCode,
  Clock, Users, Lock, Leaf, Zap,
  Globe2, Eye, Scale, Coins,
  Code2, Compass, Monitor, Globe, Terminal, Boxes,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "shield": Shield,
  "database": Database,
  "hard-drive": HardDrive,
  "cpu": Cpu,
  "network": Network,
  "git-merge": GitMerge,
  "layers": Layers,
  "file-code": FileCode,
  "clock": Clock,
  "users": Users,
  "lock": Lock,
  "leaf": Leaf,
  "zap": Zap,
  "globe-2": Globe2,
  "eye": Eye,
  "scale": Scale,
  "coins": Coins,
  "code-2": Code2,
  "compass": Compass,
  "monitor": Monitor,
  "globe": Globe,
  "terminal": Terminal,
  "boxes": Boxes,
};

export function getIcon(key: string): LucideIcon {
  return iconMap[key] ?? Shield;
}
