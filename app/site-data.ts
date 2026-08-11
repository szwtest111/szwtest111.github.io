export type Product = {
  slug: string;
  n: string;
  title: string;
  desc: string;
  items: string[];
  status: "已有明细" | "待补充";
  source: "资料(1).docx";
};

// 产品目录以客户提供的《资料(1).docx》为唯一依据。
// 未经客户确认的型号、用途、性能卖点和英文产品名不在网站中展示。
export const products: Product[] = [
  {
    slug: "xray-tube-packaging",
    n: "01",
    title: "X射线管封装系列",
    desc: "不锈钢封装、进口替代、低功率不锈钢封装、黄铜封装。",
    items: ["不锈钢封装", "进口替代", "低功率不锈钢封装", "黄铜封装"],
    status: "已有明细",
    source: "资料(1).docx",
  },
  {
    slug: "microfocus-xray-tube",
    n: "02",
    title: "微焦点X射线管",
    desc: "35um焦点X射线管、50um焦点X射线管、100um焦点X射线管。",
    items: ["35um焦点X射线管", "50um焦点X射线管", "100um焦点X射线管"],
    status: "已有明细",
    source: "资料(1).docx",
  },
  {
    slug: "import-repair-replacement",
    n: "03",
    title: "进口维修替代",
    desc: "详细内容待补充。",
    items: [],
    status: "待补充",
    source: "资料(1).docx",
  },
  {
    slug: "anode-xray-tube",
    n: "04",
    title: "阳极X射线管",
    desc: "详细内容待补充。",
    items: [],
    status: "待补充",
    source: "资料(1).docx",
  },
  {
    slug: "high-voltage-power-supply",
    n: "05",
    title: "高压电源系列",
    desc: "30KV、50KV、65KV。",
    items: ["30KV", "50KV", "65KV"],
    status: "已有明细",
    source: "资料(1).docx",
  },
  {
    slug: "research-customization",
    n: "06",
    title: "研发定制",
    desc: "详细内容待补充。",
    items: [],
    status: "待补充",
    source: "资料(1).docx",
  },
  {
    slug: "integrated-xray-source",
    n: "07",
    title: "一体化射线源",
    desc: "详细内容待补充。",
    items: [],
    status: "待补充",
    source: "资料(1).docx",
  },
  {
    slug: "detector",
    n: "08",
    title: "探测器",
    desc: "详细内容待补充。",
    items: [],
    status: "待补充",
    source: "资料(1).docx",
  },
];

export const productDirections = [
  "结构分析X射线管",
  "荧光分析X射线管",
  "测厚X射线管",
  "工业探伤X射线管",
];

// 应用领域来自客户直接提供的公司简介，不与具体产品系列强行绑定。
export const applicationAreas = [
  "荧光分析领域",
  "成像领域",
  "衍射分析",
  "厚度测量",
  "密度测量",
  "应力分析",
  "其他相关X射线领域",
];

export const processSteps = [
  "基材预处理",
  "零部件装配",
  "真空封接",
  "排气老练",
  "安全检测",
  "封装出货",
];

export const companyHighlights = [
  { value: "2022", label: "成立时间" },
  { value: "ISO 9001", label: "品质体系" },
  { value: "ISO 7", label: "洁净室无尘作业" },
  { value: "标准 + 非标", label: "定制解决方案" },
];

export const coreCapabilities = [
  { n: "01", title: "定制开发能力", desc: "参数设计、非标设计、试制、工艺调试与导入。" },
  { n: "02", title: "材料与制程能力", desc: "精密加工、真空封装、排气及稳定生产。" },
  { n: "03", title: "品质与检测能力", desc: "来料检验、制程巡检、性能校验、老化与可靠性检测。" },
  { n: "04", title: "交付响应能力", desc: "批次管理、库存、排程、出货确认与持续供货。" },
];
