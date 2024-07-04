// @ts-ignore
/* eslint-disable */

declare namespace API {
  type PageParams = {
    id?: string;
    current?: number;
    pageIndex?: number;
    pageSize?: number;
    name?: string;
    username?: string;
    orderId?: string;
    ordersId?: number;
    orderDate?: string;
    start?: string;
    end?: string;
    nickName?: string;
    checkType1Name?: string;
    card?: string;
    contactPhone?: string;
    condition?: string;
  };

  type Role = {
    id: number;
    name: string;
    code: string;
  };

  type Org = {
    id?: number;
    name: string;
    parentId: number;
    parentName?: string;
    deadLine?: number;
    treeId?: string;
    createTime?: number;
    updateTime?: number;
    hasLeaf?: number;
  };

  type Group = {
    id?: number;
    name: string;
    mark: string;
    parentId: number;
    parentName?: string;
    checkOrgId: number;
    checkOrgName?: string;
    treeId?: number;
    createTime?: number;
    updateTime?: number;
  };

  type Account = {
    id?: number;
    username: string;
    password?: string;
    nickName?: string;
    age?: number;
    status?: string;
    createTime?: number;
    lastLoginTime?: number;
    roles?: Role[];
    roleIdList?: number[];
    card?: string;
    checkOrgid?: number;
    checkOrgName?: string;
    mark?: string;
    groupName?: string;
    [key: string]: any;
  };

  type CurrentUser = {
    id: number;
    username: string;
    password: string;
    nickName: string;
    status: string;
    roles?: Role[];
    card?: string;
    age?: number;
    groupName?: string;
  };

  type LoginResult = {
    id?: number;
    username?: string;
    nickName?: string;
    authorization?: string;
    roles?: any;
    status?: string;
    type?: string;
    errorMessage?: string;
  };

  type Address = {
    id?: number;
    createTime?: number;
    updateTime?: number;
    name: string;
    addr: string;
  };

  type Log = {
    id: number;
    createTime: number;
    updateTime: number;
    username: string;
    ip: string;
    method: string;
    operation: string;
    params: string;
    time: number;
  };

  type Notice = {
    id?: number;
    key?: any;
    type?: number;
    title?: string;
    content?: string;
    createTime?: number;
    isRead?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type LoginParams = {
    username?: string;
    mark?: string;
    password?: string;
    type?: string;
    mobile?: string;
    captcha?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type ReserveItem = {
    card: string;
    checkGroupName: string;
    checkOrgId: number;
    checkOrgName: string;
    contactName: string;
    contactPhone: string;
    createTime: number;
    id: number;
    mark: string;
    nickName: string;
    orderDate: string;
    orderId: string;
    orderTime: number;
    status: number;
    type: number;
    updateTime: number;
  };

  type OrderInfoItem = {
    id: number;
    nickName: string;
    male: number;
    age: number;
    card: string;
    checkOrgId: number;
    checkTime: string;
    checkType: number;
    checkType1: number;
    checkType1Name: string;
    checkType2: number;
    checkType2Name: string;
    orderId: string;
    ordersId: number;
    orderDate: string;
    orderTime: number;
    templateId: number;
    hasStcf?: boolean;
    art?: boolean;
    createTime: number;
    updateTime: number;
    zx?: boolean;
    cj?: boolean;
    contactPhone?: string;
    checkResult?: number;
    checkResultDes?: string;
    needCorrect: boolean;
  };

  /** 身高体重 */
  type Sgtz = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    height: number;
    heightScore: number;
    weight: number;
  };

  /** 身体成分 */
  type Stcf = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    abd: number;
    ac: number;
    acl: number;
    acr: number;
    amc: number;
    bcm: number;
    bcmMax: number;
    bcmMin: number;
    bfm: number;
    bmc: number;
    bmcMax: number;
    bmcMin: number;
    bmi: number;
    bmiMax: number;
    bmiMin: number;
    bmr: number;
    bmrMax: number;
    bmrMin: number;
    bsmi: string;
    chest: number;
    datetimes: string;
    ecw: number;
    ecwMax: number;
    ecwMin: number;
    equip: string;
    fc: number;
    ffm: number;
    ffmMax: number;
    ffmMin: number;
    fla: number;
    fll: number;
    fra: number;
    frl: number;
    fs: number;
    ft: number;
    groupSn: string;
    hip: number;
    icw: number;
    icwMax: number;
    icwMin: number;
    id: number;
    ila5: number;
    ila50: number;
    ila500: number;
    ill5: number;
    ill50: number;
    ill500: number;
    ira5: number;
    ira50: number;
    ira500: number;
    irl5: number;
    irl50: number;
    irl500: number;
    it5: number;
    it50: number;
    it500: number;
    lla: number;
    llaMax: number;
    llaMin: number;
    lll: number;
    lllMax: number;
    lllMin: number;
    lra: number;
    lraMax: number;
    lraMin: number;
    lrl: number;
    lrlMax: number;
    lrlMin: number;
    llt: number;
    ltMax: number;
    ltMin: number;
    mc: number;
    meanarterypressure: string;
    mineral: number;
    mineralMax: number;
    mineralMin: number;
    neck: number;
    obesity: number;
    odMax: number;
    odMin: number;
    odk: string;
    odkMax: string;
    odkMin: string;
    orderDate: string;
    orderId: string;
    pbf: number;
    pbfMax: number;
    pbfMin: number;
    pbfmMax: number;
    pbfmMin: number;
    pfla: number;
    pfll: number;
    pfra: number;
    pfrl: number;
    pft: number;
    pilla: number;
    pilll: number;
    pilra: number;
    pilrl: number;
    pilt: number;
    protein: number;
    proteinMax: number;
    proteinMin: number;
    pulsepressure: string;
    ratepressureproduct: string;
    renergy: number;
    sickSn: string;
    slm: number;
    slmMax: number;
    slmMin: number;
    smm: number;
    smmMax: number;
    smmMin: number;
    sphyg1: string;
    sphyg2: string;
    sphyg3: string;
    tbw: number;
    tbwMax: number;
    tbwMin: number;
    thighl: number;
    thighr: number;
    totScore: string;
    tw: number;
    userAge: number;
    userBirthday: string;
    userGender: string;
    userHeight: number;
    userId: string;
    userName: string;
    vfl: number;
    wc: number;
    wed: number;
    whr: number;
    whrMax: number;
    whrMin: number;
    wt: number;
    wtMax: number;
    wtMin: number;
    report: string;
    reportName: string;
    stjhSz: number;
    stjhXz: number;
    stjhXxz: number;
    stjhQs: number;
    jhd: number;
  };

  type fms = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    gdsd: number;
    jgjhdd: number;
    score: number;
    skb: number;
    wdxfwc: number;
    xzwdx: number;
    zxgjb: number;
    zxtt: number;
  };

  /** 体姿体态 */
  type Tztt = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    report: string;
    fbChestWaist: number;
    fbChestWaistAbnormal: number;
    fbFoot: number;
    fbFootAbnormal: number;
    fbHead: number;
    fbHeadAbnormal: number;
    fbLeg: number;
    fbLegAbnormal: number;
    fbNeck: number;
    fbNeckAbnormal: number;
    fbPelvis: number;
    fbPelvisAbnormal: number;
    fbShoulder: number;
    fbShoulderAbnormal: number;
    fbShoulderBlade: number;
    fbShoulderBladeAbnormal: number;
    sideAnkle: number;
    sideAnkleAbnormal: number;
    sideChest: number;
    sideChestAbnormal: number;
    sideHead: number;
    sideHeadAbnormal: number;
    sideHip: number;
    sideHipAbnormal: number;
    sideKnee: number;
    sideKneeAbnormal: number;
    sideNeck: number;
    sideNeckAbnormal: number;
    sidePelvis: number;
    sidePelvisAbnormal: number;
    sideWaist: number;
    sideWaistAbnormal: number;
  };

  /** 专项体态体态 */
  type ZxTztt = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    ankleSurround: number;
    chestSurround: number;
    fingerDistance: number;
    handLength: number;
    hipWidth: number;
    iliacWidth: number;
    jumpHigh: number;
    legLength: number;
    legType: number;
    shoulderWidth: number;
    tendon: number;
    underBridge: number;
    fbFoot: number;
  };

  /** 运动心肺功能 */
  type Xfgn = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    baseHeartRhythm: number;
    coi: number;
    diastolicPressure: number;
    exerciseHeartRhythm: number;
    firstHeartRhythm: number;
    secHeartRhythm: number;
    systolicPressure: number;
    thirdHeartRhythm: number;
  };

  /** 敏捷反应 */
  type Mjfy = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    actionFAValue: number;
    actionFAvgValue: number;
    actionFBValue: number;
    actionFBeginValue: number;
    actionFCValue: number;
    actionFDValue: number;
    actionSAValue: number;
    actionSAvgValue: number;
    actionSBValue: number;
    actionSBeginValue: number;
    actionSCValue: number;
    actionSDValue: number;
    actionTAValue: number;
    actionTAvgValue: number;
    actionTBValue: number;
    actionTBeginValue: number;
    actionTCValue: number;
    actionTDValue: number;
    respAvgValue: number;
    respFValue: number;
    respSValue: number;
    respTValue: number;
  };

  /** 脊柱弯曲 */
  type Jzwq = {
    id: number;
    orderId: string;
    createTime: number;
    updateTime: number;
    report: number;
  };

  type JzwqReport = {
    id: number;
    createTime: number;
    updateTime: number;
    spinalId: number;
    name: string;
    fileName: string;
    url: string;
  };

  /** 平衡 */
  type Balance = {
    id: number;
    orderId: string;
    report: number;
    createTime: number;
    updateTime: number;
  };

  type BalanceReport = {
    id: number;
    createTime: number;
    updateTime: number;
    balanceId: number;
    name: string;
    fileName: string;
    url: string;
  };

  /** 超声骨密度 */
  type gmd = {
    id: number;
    orderId: string;
    patientId: string;
    createTime: number;
    updateTime: number;
    name: string;
    age: number;
    birthDay: string;
    checkDate: string;
    checkId: string;
    checkResult: string;
    checkResultStr: string;
    credentialNumber: string;
    customerFields: string;
    deviceId: string;
    diagnosis: string;
    diagnosticianDoctor: string;
    examDepartment: string;
    examDoctor: string;
    fullPath: string;
    gender: number;
    genderStr: string;
    height: number;
    idEntityNumber: string;
    idEntityType: number;
    imagePath: string;
    parameters: string;
    paramterName: string;
    phone: string;
    report: string;
    reportName: string;
    requestDate: string;
    requestDepot: string;
    requestDoctor: string;
    scanCode: string;
    serialNo: string;
    sharedFolderPath: string;
    studyUid: string;
    token: string;
    weight: number;
  };

  /** 检测表 */
  type OrderInfo = {
    balance: Balance;
    body: Tztt;
    special: ZxTztt;
    fms: fms;
    gmd: gmd;
    heightWeight: Sgtz;
    orderInfo: OrderInfoItem;
    responsive: Mjfy;
    stcf: Stcf;
    spinal: Jzwq;
    xfgn: Xfgn;
  };

  /** 个人预约详情 */
  type PersonalReserveInfo = {
    age: number;
    card: string;
    checkGroupName: string;
    checkOrgId: number;
    checkOrgName: string;
    checkType1Name: string;
    checkType2Name: string;
    contactName: string;
    contactPhone: string;
    createTime: number;
    id: number;
    male: number;
    mark: string;
    nickName: string;
    orderDate: string;
    orderId: string;
    orderTime: number;
    status: number;
    type: number;
    updateTime: number;
  };

  type TeamReserveInfo = {
    age: number;
    card: string;
    checkOrgId: number;
    checkTime: string;
    checkType1: number;
    checkType1Name: string;
    checkType2: number;
    checkType2Name: string;
    createTime: number;
    id: number;
    male: number;
    nickName: string;
    orderDate: string;
    orderId: string;
    orderTime: number;
    ordersId: number;
    templateId: number;
    updateTime: number;
  };
  /**指引单模板 **/
  type GuidingItem = {
    id: number;
    name: string;
    checkOrgId: number;
    checkOrgName: string;
    treeId: string;
    fileName: string;
    createTime: number;
    updateTime: number;
  };

  /**报告单模板 **/
  type ReportItem = {
    id: number;
    name: string;
    checkOrgId: number;
    checkOrgName: string;
    checkType: number;
    checkTypeName: string;
    orgTreeId: string;
    typeTreeId: string;
    fileName: string;
    createTime: number;
    updateTime: number;
  };

  type CheckItems = {
    id?: number;
    name: string;
    parentId: number;
    parentName?: string;
    deadLine?: number;
    treeId?: string;
    createTime?: number;
    updateTime?: number;
    hasLeaf?: number;
  };

  type Gzry = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    avatar?: string;
    indate?: string;
    level?: string;
    name?: string;
    region?: string;
    type?: number;
  };

  type TrainingRecord = {
    id: number;
    createTime: number;
    updateTime: number;
    orderId: string;
    male: number;
    yymp: string;
    yympScore: number;
    bbmp: string;
    bbmpScore: number;
    ytxs: string;
    ytxsScore: number;
    ywqz: string;
    ywqzScore: number;
    wsmp: string;
    wsmpScore: number;
    ldty: string;
    ldtyScore: number;
    zqrg: string;
    zqrgScore: number;
    lqrg: string;
    lqrgScore: number;
    pq: string;
    pqScore: number;
    ppq: string;
    ppqScore: number;
    score: number;
  };

  type Training = {
    id: number;
    createTime: number;
    updateTime: number;
    userId: number;
    operatorId: number;
    nickName: string;
    male: number;
    age: number;
    card: string;
    anomaly: string;
    remark: string;
    type: number;
    isUseful: boolean;
    time: number;
    addressId: number;
    address: string;
  };

  type ExpectedTraining = {
    id: number;
    createTime: number;
    updateTime: number;
    nickName: string;
    male: number;
    age: number;
    card: string;
    contactName: string;
    contactPhone: string;
    correctTime: number;
    status: number;
  };

  type CountOrder = {
    cnt: number;
    name: string;
  };

  type StatsBody = {
    total: number;
    abNum: number;
  };


  type StatsBodyAb = {
    abName: string;
    abNum: number;
  };

  type StatsPie = {
    percent: number;
    name: string;
  };

  type PieData = {
    y: number;
    x: string;
  };

  type StatsResp = {
    age: string;
    actionAvg: number;
    respAvg: number;
  };

  type StatsRespScore = {
    name: string;
    type: string;
    num: number;
  };

  type StatsStcf = {
    cnt: number;
    name: string;
  };

  type StatsBalance = {
    cnt: number;
    report: string;
  };

  type StatsXfgn = {
    name: string;
    num: number;
  };

  type StatsFms = {
    name: string;
    num: number;
  };
  
  type FmsData = {
    age: string;
    values: number[];
  };
  type FmsAvgData = {
    age: string;
    values: number;
  };

  type StatsGmd = {
    total: number;
    cnt: number;
  };
  
  type StatsGmdAge = {
    name: string;
    age: string;
    cnt: number;
  };
  
  type StatsParam = {
    male: number;
    checkType1: number;
    checkType2: number;
  };
  
  type StatsSpecial = {
    name: string;
    num: number;
  };
  

  
  type StatsBoardTotal = {
    name: string;
    totalNum: number;
    fmaleNum: number;
    maleNum: number;
    proNum: number;
  };
}
