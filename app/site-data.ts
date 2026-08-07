export type Product = {
  slug: string;
  n: string;
  title: string;
  en: string;
  desc: string;
  applications: string[];
  features: string[];
};

export const products: Product[] = [
  {
    slug: "structure-analysis",
    n: "01",
    title: "结构分析X射线管",
    en: "STRUCTURAL ANALYSIS X-RAY TUBE",
    desc: "面向材料结构、晶相与衍射分析场景，为分析设备提供稳定、可靠的低能X射线核心部件。",
    applications: ["衍射分析", "应力分析", "材料结构研究"],
    features: ["稳定输出", "精密封装", "适配定制"],
  },
  {
    slug: "fluorescence-analysis",
    n: "02",
    title: "荧光分析X射线管",
    en: "X-RAY FLUORESCENCE TUBE",
    desc: "针对元素成分与荧光分析需求开发，兼顾输出稳定性、使用寿命与仪器适配效率。",
    applications: ["荧光分析", "元素检测", "成分分析"],
    features: ["低能高效", "性能稳定", "多场景适配"],
  },
  {
    slug: "thickness-gauge",
    n: "03",
    title: "测厚X射线管",
    en: "THICKNESS GAUGE X-RAY TUBE",
    desc: "服务于工业在线与离线厚度测量，为金属、涂层及相关材料检测提供稳定射线源。",
    applications: ["厚度测量", "密度测量", "在线检测"],
    features: ["连续稳定", "响应可靠", "工程适配"],
  },
  {
    slug: "industrial-ndt",
    n: "04",
    title: "工业探伤X射线管",
    en: "INDUSTRIAL NDT X-RAY TUBE",
    desc: "适用于工业成像与无损检测场景，支持内部结构、缺陷与装配质量的可视化判断。",
    applications: ["工业成像", "无损检测", "内部缺陷检测"],
    features: ["成像清晰", "严苛品控", "可靠耐用"],
  },
];

export const processSteps = [
  "原材料检验",
  "真空封装",
  "靶材焊接",
  "高压组装",
  "老化测试",
];
