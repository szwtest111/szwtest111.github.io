export type Product = {
  slug: string;
  n: string;
  title: string;
  desc: string;
  items: string[];
  status: "基础信息" | "后续更新";
};

// 产品目录以客户提供的《资料(1).docx》为唯一依据。
// 未经客户确认的型号、用途、性能卖点和英文产品名不在网站中展示。
export const products: Product[] = [
  {
    slug: "xray-tube-packaging",
    n: "01",
    title: "X射线管封装系列",
    desc: "包含不锈钢封装、进口替代、低功率不锈钢封装与黄铜封装四个方向；具体型号与技术参数后续补充。",
    items: ["不锈钢封装", "进口替代", "低功率不锈钢封装", "黄铜封装"],
    status: "基础信息",
  },
  {
    slug: "microfocus-xray-tube",
    n: "02",
    title: "微焦点X射线管",
    desc: "包含35um、50um与100um三档焦点规格；具体型号、功率、电压及应用信息后续补充。",
    items: ["35um焦点X射线管", "50um焦点X射线管", "100um焦点X射线管"],
    status: "基础信息",
  },
  {
    slug: "import-repair-replacement",
    n: "03",
    title: "进口维修替代",
    desc: "提供进口维修替代服务；适配品牌、型号范围、维修内容与交付标准后续补充。",
    items: ["具体适配品牌待补充", "具体型号范围待补充"],
    status: "基础信息",
  },
  {
    slug: "anode-xray-tube",
    n: "04",
    title: "阳极X射线管",
    desc: "阳极X射线管的具体型号、结构形式及技术参数后续补充。",
    items: ["具体产品型号待补充", "产品实拍资料待补充"],
    status: "基础信息",
  },
  {
    slug: "high-voltage-power-supply",
    n: "05",
    title: "高压电源系列",
    desc: "包含30KV、50KV与65KV三个电压档位；详细电气参数与适配信息后续补充。",
    items: ["30KV", "50KV", "65KV"],
    status: "基础信息",
  },
  {
    slug: "research-customization",
    n: "06",
    title: "研发定制",
    desc: "面向研发定制需求提供相关服务；定制范围、合作流程与交付方式后续补充。",
    items: ["具体定制范围待补充", "合作流程待补充"],
    status: "基础信息",
  },
  {
    slug: "integrated-xray-source",
    n: "07",
    title: "一体化射线源",
    desc: "产品介绍、型号与技术参数将在相关资料完善后更新。",
    items: ["产品介绍待更新", "型号与参数待更新"],
    status: "后续更新",
  },
  {
    slug: "detector",
    n: "08",
    title: "探测器",
    desc: "产品介绍、型号与技术参数将在相关资料完善后更新。",
    items: ["产品介绍待更新", "型号与参数待更新"],
    status: "后续更新",
  },
];

// 应用领域综合客户公司简介与商务版公司介绍，不与具体产品系列强行绑定。
export const applicationAreas = [
  "荧光分析领域",
  "XRF镀层测厚",
  "X射线成像领域",
  "厚度测量",
  "无损探伤",
  "工业CT",
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
