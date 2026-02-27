import { useState } from 'react'
import { createPortal } from 'react-dom'
import './AdminPage.css'
import './EstimateForm.css'
import modalLogoImg from '../assets/modal-logo2.png'
import modalLogoImg1 from '../assets/modal-logo.png'
import printIconImg from '../assets/print-icon.png'
import stampImg from '../assets/stamp.png'
function QuoteModal({formData, onClose}) {
    const unitPrice = 950000
    const sqmPrice = 4691358
    const ledQty = formData.totalPanels
    const ledSqm = Math.round((formData.ledSizeW * formData.ledSizeH) / 1000000 * 100) / 100
    const ledTotal = unitPrice * ledQty
    const processorPrice = 3000000
    const laborPrice = 300000
    const etcPrice = 100000
    const laborQty = formData.installPersonnel
    const sub1 = ledTotal
    const sub2 = processorPrice
    const sub3 = laborPrice * laborQty
    const sub4 = etcPrice * 2
    const grandTotal = sub1 + sub2 + sub3 + sub4
    const addCost = 2200000

    const fmt = (n) => n.toLocaleString()

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="quote-wrapper" onClick={e => e.stopPropagation()}>
                <div className="quote-outer">
                    {/* 헤더 */}
                    <div className="quote-header">
                        <button className="modal-print-btn" title="인쇄하기" style={{flexShrink: 0}}>
                            <img src={printIconImg} alt="인쇄하기" style={{height: '80px'}}/>
                        </button>
                        <div className="quote-title-text">견 적 서</div>
                        <div className="quote-header-logo">
                            <img src={modalLogoImg1} alt="logo"
                                 style={{height: '75px', verticalAlign: 'bottom', imageRendering: 'crisp-edges'}}/>
                        </div>
                    </div>

                    <div className="quote-date">DATE : {formData.date}</div>

                    {/* 판매 견적서 타이틀바 */}
                    <div className="section">
                        <div className="quote-section-title">판매 견적서</div>

                        {/* 업체 정보 */}
                        <table className="quote-client-table">
                            <tbody>
                            <tr>
                                <td className="qct-label">기관/업체명</td>
                                <td className="qct-value" colSpan={3}>{formData.clientCompany}</td>
                            </tr>
                            <tr>
                                <td className="qct-label">부서명</td>
                                <td className="qct-value">{formData.clientDepartment}</td>
                                <td className="qct-label">업체 담당자</td>
                                <td className="qct-value">{formData.clientManager}</td>
                            </tr>
                            <tr>
                                <td className="qct-label">회사 연락처</td>
                                <td className="qct-value">{formData.clientPhone}</td>
                                <td className="qct-label">핸드폰 번호</td>
                                <td className="qct-value">{formData.clientMobile}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="quote-divider"></div>
                        {/* 상품 테이블 */}
                        <table className="quote-items-table">
                            <thead>
                            <tr>
                                <th>순번</th>
                                <th>품명</th>
                                <th>규격</th>
                                <th>수량</th>
                                <th>단가</th>
                                <th>가격</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* 1. LED */}
                            <tr style={{borderTop: 'none'}}>
                                <td rowSpan={2} style={{height: '60px'}} className="qi-center">1</td>
                                <td rowSpan={2} className="qi-product">
                                </td>
                                <td className="qi-center">{formData.productSize}</td>
                                <td className="qi-center">{ledQty}</td>
                                <td className="qi-right">₩      {fmt(unitPrice)}</td>
                                <td className="qi-right" rowSpan={2}>₩      {fmt(ledTotal)}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "center"}}>sqm</td>
                                <td className="qi-center">{ledSqm}</td>
                                <td className="qi-right">₩      {fmt(sqmPrice)}</td>
                            </tr>
                            <tr className="qi-subtotal">
                                <td colSpan={4} className="qi-center">소계</td>
                                <td colSpan={2} className="qi-right">₩      {fmt(sub1)}</td>
                            </tr>
                            {/* 2. 프로세서 */}
                            <tr className="qi-item-after-subtotal" style={{height: '60px'}}>
                                <td className="qi-center">2</td>
                                <td className="qi-product">
                                </td>
                                <td className="qi-center">—</td>
                                <td className="qi-center">{formData.processorQuantity}</td>
                                <td className="qi-right">₩      {fmt(processorPrice)}</td>
                                <td className="qi-right">₩      {fmt(sub2)}</td>
                            </tr>
                            <tr className="qi-subtotal">
                                <td colSpan={4} className="qi-center">소계</td>
                                <td colSpan={2} className="qi-right">₩      {fmt(sub2)}</td>
                            </tr>
                            {/* 3. 시공 인건비 */}
                            <tr className="qi-item-after-subtotal" style={{height: '60px'}}>
                                <td className="qi-center">3</td>
                                <td className="qi-product">시공 인건비</td>
                                <td className="qi-center">인</td>
                                <td className="qi-center">{laborQty}</td>
                                <td className="qi-right">₩      {fmt(laborPrice)}</td>
                                <td className="qi-right">₩      {fmt(sub3)}</td>
                            </tr>
                            <tr className="qi-subtotal">
                                <td colSpan={4} className="qi-center">소계</td>
                                <td colSpan={2} className="qi-right">₩      {fmt(sub3)}</td>
                            </tr>
                            {/* 4. 기타 비용 */}
                            <tr className="qi-item-after-subtotal" style={{height: '60px'}}>
                                <td className="qi-center">4</td>
                                <td className="qi-product">기타 비용</td>
                                <td className="qi-center">—</td>
                                <td className="qi-center">2</td>
                                <td className="qi-right">₩      {fmt(etcPrice)}</td>
                                <td className="qi-right">₩      {fmt(sub4)}</td>
                            </tr>
                            <tr className="qi-subtotal">
                                <td colSpan={4} className="qi-center">소계</td>
                                <td colSpan={2} className="qi-right">₩      {fmt(sub4)}</td>
                            </tr>
                            {/* 5. 지방 출장비 */}
                            <tr className="qi-item-after-subtotal" style={{height: '60px'}}>
                                <td className="qi-center">5</td>
                                <td className="qi-product">지방 출장비 [{formData.installPlace}]<br/><span style={{fontSize: '10px', color: '#666'}}>(운송비,숙박,기타)</span></td>
                                <td className="qi-center">지역</td>
                                <td className="qi-center">1</td>
                                <td className="qi-right">₩      {fmt(formData.travelCost || 0)}</td>
                                <td className="qi-right">₩      {fmt(formData.travelCost || 0)}</td>
                            </tr>
                            <tr className="qi-subtotal">
                                <td colSpan={4} className="qi-center">소계</td>
                                <td colSpan={2} className="qi-right">₩      {fmt(formData.travelCost || 0)}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="quote-note">*설치 구조물 / UTP케이블 작업 / 전기 공사 비용은 현장실측 이후 측정 합니다.</div>

                        {/* 합계 */}
                        <table className="quote-total-table">
                            <tbody>
                            <tr className="qt-mint-row">
                                <td className="qt-label">판매</td>
                                <td className="qt-desc">LED 디스플레이 판매가 (1+2)</td>
                                <td className="qt-amount"><span className="qt-won">₩</span><span
                                    className="qt-num">{fmt(sub1 + sub2)}</span></td>
                            </tr>
                            <tr className="qt-green-row">
                                <td className="qt-label">추가</td>
                                <td className="qt-desc">시공비 + 기타 비용</td>
                                <td className="qt-amount"><span className="qt-won">₩</span><span
                                    className="qt-num">{fmt(addCost)}</span></td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="quote-total-table quote-grand-table">
                            <tbody>
                            <tr className="qt-grand">
                                <td colSpan={2} className="qt-grand-label">합 계</td>
                                <td className="qt-amount"><span className="qt-won">₩</span><span
                                    className="qt-num">{fmt(sub1 + sub2)}</span></td>
                            </tr>
                            </tbody>
                        </table>

                        {/* 약관 + 도장 */}
                        <div className="quote-terms-wrapper">
                        <div className="quote-stamp">
                            <img src={stampImg} alt="stamp" className="quote-stamp-img" />
                        </div>

                        <div className="quote-terms">
                            <div className="quote-terms-text">
                                <p className="qt-bold qt-icon">견적조건</p>
                                <p className="qt-bold qt-indent">1. 견적서 항목 외 추가 사항이나, 현장 추가 사항은 별도의 금액이 추가됩니다.</p>
                                <p className="qt-bold qt-indent">2. 전력 및 통신은 고객사가 기본 제공하며 , 미 제공시 증설 공사 금액이 추가됩니다.</p>
                                <p className="qt-bold qt-indent">3. 현장 상황에 따라 보강 구조물 필요시 제작 비용이 추가됩니다.</p>
                                <p className="qt-bold qt-indent">4. 인,허가 사항은 별도 입니다.</p>
                                <p className="qt-bold qt-icon">결제조건 : 발주시 계약금 60% , 잔금 40%로 진행 됩니다</p>
                                <p className="qt-bold qt-icon">납  기  일: 발주일로 부터 30일 (모델 및 수량에 따라 변동 될 수 있습니다)</p>
                                <p className="qt-bold qt-icon">A/S 기간 : 납기일로 부터 2년 무상 (단, 천재지변 및 고객 부주의로 인한 제품 파손 시 비용이 청구 됩니다)</p>
                                <p className="qt-bold qt-icon">제품의 성능 향상을 위해 제품 스펙은 일부 변경 될 수 있습니다.</p>
                                <p className="qt-bold qt-icon">입금계좌 : 하나은행 471-910014-06704 예금주 : ㈜이지텍인터내셔널</p>
                            </div>
                            </div>
                        </div>
                        {/* 하단 버튼 */}
                        <div className="quote-footer">
                            <button className="modal-btn-close" onClick={onClose}>닫기</button>
                            <button className="quote-btn-email">메일 보내기</button>
                        </div>
                </div>
                    </div>
            </div>
        </div>,

        document.body
    )
}


function ViewModal({formData, onClose, onQuote}) {
    const panelW = 40
    const panelH = 24
    const gap = 2
    const padding = 2
    const gridW = formData.width * panelW + (formData.width - 1) * gap + padding * 2
    const gridH = formData.height * panelH + (formData.height - 1) * gap + padding * 2

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            {/* 바깥 흰 박스 */}
            <div className="modal-outer" onClick={e => e.stopPropagation()}>
                {/* 큰 민트 테두리 - 전체 감쌈 */}
                <div className="modal-border-outer">
                    {/* 헤더: 인쇄버튼(좌 끝) + 로고(중앙 왼쪽) */}
                    <div className="modal-header">
                        <button className="modal-print-btn" title="인쇄하기">
                            <img src={printIconImg} alt="인쇄하기" style={{height: '80px'}}/>
                        </button>
                        <div className="modal-logo"
                             style={{flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px'}}>
                            <img src={modalLogoImg} alt="logo" style={{height: '75px', imageRendering: 'crisp-edges'}}/>
                        </div>
                    </div>

                    {/* 작은 민트 테두리 - 타이틀 + 내용 감쌈 */}
                    <div className="modal-inner">
                        {/* 청록 타이틀바 */}
                        <div className="modal-title">LED Display 전체 내용 보기</div>

                        {/* 내용 */}
                        <div className="modal-content">
                            {/* 날짜 */}
                            <div className="modal-row full">
                                <div className="modal-label">날짜</div>
                                <div className="modal-value modal-value-cyan">{formData.date}</div>
                            </div>
                            {/* 담당자 / 부서 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label">담당자</div>
                                    <div className="modal-value modal-value-cyan">{formData.manager}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label">부서</div>
                                    <div className="modal-value modal-value-cyan">{formData.department}</div>
                                </div>
                            </div>
                            {/* 회사 연락처 / 핸드폰 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label">회사 연락처</div>
                                    <div className="modal-value modal-value-cyan">{formData.companyPhone}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label">핸드폰 번호</div>
                                    <div className="modal-value modal-value-cyan">{formData.mobilePhone}</div>
                                </div>
                            </div>
                            {/* E-mail */}
                            <div className="modal-row full">
                                <div className="modal-label">E-mail</div>
                                <div className="modal-value modal-value-cyan">{formData.email}</div>
                            </div>
                            {/* 회사 주소 */}
                            <div className="modal-row full">
                                <div className="modal-label">회사 주소</div>
                                <div className="modal-value modal-value-cyan">{formData.companyAddress}</div>
                            </div>
                            {/* 첨부파일 */}
                            <div className="modal-row full">
                                <div className="modal-label">첨부파일</div>
                                <div className="modal-value modal-value-cyan">
                                    <a href="#"
                                       style={{color: '#25CAD2', textDecoration: 'underline'}}>{formData.attachment}</a>
                                </div>
                            </div>

                            <div className="modal-divider"></div>

                            {/* 예상 설치날짜 / 설치기간 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label modal-label-blue">예상 설치날짜</div>
                                    <div className="modal-value modal-value-blue">{formData.installDate}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label modal-label-blue">예상 설치기간</div>
                                    <div className="modal-value modal-value-blue">{formData.installPeriod}</div>
                                </div>
                            </div>
                            {/* 설치 장소 / 세부 장소 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label modal-label-blue">설치 장소</div>
                                    <div className="modal-value modal-value-blue">{formData.installLocation}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label modal-label-blue">세부 장소</div>
                                    <div className="modal-value modal-value-blue">{formData.installDetailLocation}</div>
                                </div>
                            </div>
                            {/* 기타 내용 */}
                            <div className="modal-row full">
                                <div className="modal-label modal-label-blue">기타 내용</div>
                                <div className="modal-value modal-value-blue">{formData.etcContent}</div>
                            </div>

                            <div className="modal-divider"></div>

                            {/* 제품명 */}
                            <div className="modal-row full">
                                <div className="modal-label">제품명</div>
                                <div className="modal-value modal-value-cyan">{formData.productName}</div>
                            </div>
                            {/* 제품 사이즈 / 픽셀 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label">제품 사이즈</div>
                                    <div className="modal-value modal-value-cyan">{formData.productSize}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label">픽셀</div>
                                    <div className="modal-value modal-value-cyan">{formData.pixel}</div>
                                </div>
                            </div>
                            {/* 밝기 / 전력 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label">밝기</div>
                                    <div className="modal-value modal-value-cyan">{formData.brightness}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label">전력</div>
                                    <div className="modal-value modal-value-cyan">{formData.power}</div>
                                </div>
                            </div>
                            {/* 해상도 */}
                            <div className="modal-row full">
                                <div className="modal-label">해상도</div>
                                <div className="modal-value modal-value-cyan"
                                     style={{maxWidth: '37%'}}>{formData.resolution}</div>
                            </div>

                            <div className="modal-divider"></div>

                            {/* 수량 */}
                            <div className="modal-row full">
                                <div className="modal-label">수량</div>
                                <div className="modal-value modal-value-cyan">W : {formData.width} X H
                                    : {formData.height} = {formData.totalPanels}EA
                                </div>
                            </div>
                            {/* LED 사이즈 */}
                            <div className="modal-row full">
                                <div className="modal-label">LED 사이즈</div>
                                <div
                                    className="modal-value modal-value-cyan">{formData.ledSizeW} × {formData.ledSizeH}</div>
                            </div>
                            {/* LED 해상도 */}
                            <div className="modal-row full">
                                <div className="modal-label">LED 해상도</div>
                                <div
                                    className="modal-value modal-value-cyan">{formData.ledResW} × {formData.ledResH}</div>
                            </div>
                            {/* 전체 전력 */}
                            <div className="modal-row full">
                                <div className="modal-label">전체 전력</div>
                                <div className="modal-value modal-value-cyan">{formData.totalPower * 1000} W</div>
                            </div>
                            {/* 프로세스 사양 / 프로세스 수량 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label">프로세스 사양</div>
                                    <div className="modal-value modal-value-cyan">{formData.processorModel}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label">프로세스 수량</div>
                                    <div className="modal-value modal-value-cyan">{formData.processorQuantity}</div>
                                </div>
                            </div>
                            {/* 납품 설치 장소 / 지방 출장비 외 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label">납품 설치 장소</div>
                                    <div className="modal-value modal-value-cyan">{formData.installPlace}</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label">지방 출장비 외</div>
                                    <div className="modal-value modal-value-cyan">₩ {formData.travelCost?.toLocaleString()}</div>
                                </div>
                            </div>
                            {/* 설치인원 / 기타 재료비 외 */}
                            <div className="modal-row-group">
                                <div className="modal-row">
                                    <div className="modal-label">설치인원</div>
                                    <div className="modal-value modal-value-cyan">{formData.installPersonnel}명</div>
                                </div>
                                <div className="modal-row">
                                    <div className="modal-label">기타 재료비 외</div>
                                    <div className="modal-value modal-value-cyan">₩ {formData.materialCost?.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* LED 예상도 */}
                            <div className="modal-preview-wrap">
                                <div className="modal-preview-inner">
                                    <div className="modal-preview-grid-wrap">
                                        <div className="modal-preview-v-dim">
                                            <div className="modal-preview-v-line">
                                                <span className="modal-preview-v-text">{formData.ledSizeH}mm</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className="modal-led-grid"
                                                style={{
                                                    gridTemplateColumns: `repeat(${formData.width}, ${panelW}px)`,
                                                    gridTemplateRows: `repeat(${formData.height}, ${panelH}px)`,
                                                    width: gridW,
                                                    height: gridH,
                                                }}
                                            >
                                                {Array.from({length: formData.totalPanels}).map((_, i) => (
                                                    <div key={i} className="modal-led-panel"></div>
                                                ))}
                                            </div>
                                            <div className="modal-preview-h-dim" style={{width: gridW}}>
                                                <div className="modal-preview-h-line">
                                                    <span className="modal-preview-h-text">{formData.ledSizeW}mm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* modal-content 끝 */}

                    </div>
                    {/* modal-inner 끝 */}

                    {/* 하단 버튼 - modal-inner 밖, modal-border-outer 안 */}
                    <div className="modal-footer">
                        <button className="modal-btn-close" onClick={onClose}>닫기</button>
                        <button className="modal-btn-quote" onClick={onQuote}>견적서 보기</button>
                    </div>
                </div>
                {/* modal-border-outer 끝 */}
            </div>
        </div>,
        document.body
    )
}


function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showProductModal, setShowProductModal] = useState(false)
  const [showProductEditModal, setShowProductEditModal] = useState(false)
  const [showProcessorModal, setShowProcessorModal] = useState(false)
  const [showProcessorEditModal, setShowProcessorEditModal] = useState(false)
  const [showEstimateEditModal, setShowEstimateEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [selectedEstimate, setSelectedEstimate] = useState(null)
  const [selectedProcessor, setSelectedProcessor] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productPrice, setProductPrice] = useState(0)
  const [accounts, setAccounts] = useState([
    { id: 1, username: 'master', email: 'master@iztec.co.kr', role: '마스터', createdAt: '2026-01-01' }
  ])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [registerTab, setRegisterTab] = useState('led')

  // 기본 formData 구조
  const defaultFormData = {
    date: '2026.01.28',
    manager: '기영길',
    department: '기획팀',
    companyPhone: '02-6258-1600',
    mobilePhone: '010-1234-5678',
    email: 'test@example.com',
    companyAddress: '경기도 남양주시 화도읍',
    clientCompany: '갈더마코리아',
    clientDepartment: '영업부',
    clientManager: '홍길동',
    clientPhone: '02-1111-3333',
    clientMobile: '010-1234-5678',
    installDate: '2026.01.28',
    installPeriod: '2일',
    installLocation: '안양',
    installDetailLocation: '실내 로비',
    productName: 'ETK-COB1.2',
    productSize: '600x337.5',
    pixel: '1.2 Pixel',
    brightness: '800 Nit',
    power: '75/25 W',
    resolution: '480x270 Dpi',
    width: 7,
    height: 7,
    totalPanels: 49,
    ledSizeW: '4200',
    ledSizeH: '2363',
    ledResW: '3360',
    ledResH: '1890',
    totalPower: 3.7,
    installPersonnel: 3,
    processorModel: 'VX600 Pro',
    processorQuantity: 1,
    installPlace: '부산',
    travelCost: 300000,
    materialCost: 100000
  }

  const [productTax, setProductTax] = useState(0)
  const [productTotal, setProductTotal] = useState(0)
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handlePriceChange = (value) => {
    const price = parseInt(value.replace(/[^\d]/g, '')) || 0
    const tax = Math.round(price * 0.1)
    const total = price + tax
    setProductPrice(price)
    setProductTax(tax)
    setProductTotal(total)
  }
  
  const [estimates, setEstimates] = useState([
    { id: 'EST-001', date: '2026.01.28', customer: '갈더마코리아', manager: '기영길', amount: 63800000, status: '완료' },
    { id: 'EST-002', date: '2026.01.27', customer: '삼성전자', manager: '김철수', amount: 125000000, status: '진행중' },
    { id: 'EST-003', date: '2026.01.26', customer: 'LG전자', manager: '박영희', amount: 87000000, status: '대기' },
  ])

  const [products, setProducts] = useState([
    { id: '1', name: 'ETK-COB1.2', size: '600x337.5', pixel: '1.2', brightness: '800', power: '75/25', price: 950000 },
    { id: '2', name: 'ETK-COB1.5', size: '600x337.5', pixel: '1.5', brightness: '800', power: '70/25', price: 850000 },
  ])

  const [vxProducts, setVxProducts] = useState([
    { id: '1', model: 'VX400', resolution: '260만 화소', ports: 4, price: 2000000 },
    { id: '2', model: 'VX600', resolution: '390만 화소', ports: 6, price: 3000000 },
    { id: '3', model: 'VX1000', resolution: '650만 화소', ports: 10, price: 5000000 },
    { id: '4', model: 'VX2000', resolution: '1300만 화소', ports: 20, price: 8000000 },
  ])

  const renderDashboard = () => (
    <div className="admin-section">
      <h2>대시보드</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>전체 견적</h3>
          <p className="stat-value">128</p>
        </div>
        <div className="stat-card">
          <h3>이번 달 견적</h3>
          <p className="stat-value">24</p>
        </div>
        <div className="stat-card">
          <h3>이번 달 매출</h3>
          <p className="stat-value">₩ 1.2억</p>
        </div>
        <div className="stat-card">
          <h3>진행중</h3>
          <p className="stat-value">8</p>
        </div>
      </div>
      
      <div className="data-table-container">
        <h3>최근 견적</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>견적번호</th>
              <th>날짜</th>
              <th>고객명</th>
              <th>담당자</th>
              <th>금액</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {estimates.slice(0, 5).map(est => (
              <tr key={est.id}>
                <td>{est.id}</td>
                <td>{est.date}</td>
                <td>{est.customer}</td>
                <td>{est.manager}</td>
                <td>₩ {est.amount.toLocaleString()}</td>
                <td><span className={`status-badge ${est.status}`}>{est.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderEstimates = () => (
    <div className="admin-section">
      <h2>등록 자료 보기</h2>
      <div className="search-bar">
        <input type="text" placeholder="견적번호 또는 고객명 검색" />
        <button className="btn-cyan">검색</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>이지텍 담당자</th>
            <th>업체명</th>
            <th>업체 담당자</th>
            <th>연락처</th>
            <th>메일주소</th>
            <th>의뢰내역</th>
            <th>합계 금액</th>
            <th>내용보기</th>
            <th>견적서 보기</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map(est => (
            <tr key={est.id}>
              <td>{est.date}</td>
              <td>{est.manager}</td>
              <td>{est.customer}</td>
              <td>{est.clientManager || '홍길동'}</td>
              <td>{est.phone || '010-1234-5678'}</td>
              <td>{est.email || 'test@example.com'}</td>
              <td>{est.request || 'ETK-COB1.2 / 1.2Pixel / 7x5(35ea)'}</td>
              <td style={{whiteSpace: 'nowrap'}}>₩ {est.amount.toLocaleString()}</td>
              <td><button className="btn-small" style={{background: '#FF8C00', color: 'white'}} onClick={() => {
                setSelectedEstimate(est)
                setShowViewModal(true)
              }}>내용<br/>보기</button></td>
              <td><button className="btn-small" style={{background: '#8cc63f', color: 'white'}} onClick={() => {
                setSelectedEstimate(est)
                setShowQuoteModal(true)
              }}>견적서<br/>보기</button></td>
              <td>
                <button style={{padding: '4px 8px', fontSize: '12px', marginRight: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#4ECDC4', color: 'white'}} onClick={() => {
                  setSelectedEstimate(est)
                  setShowEstimateEditModal(true)
                }}>수정</button>
                <button style={{padding: '4px 8px', fontSize: '12px', marginRight: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#dc3545', color: 'white'}} onClick={() => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    setEstimates(estimates.filter(e => e.id !== est.id))
                  }
                }}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderProducts = () => (
    <div className="admin-section">
      <h2>제품 관리</h2>
      
      <div className="product-section">
        <div className="section-title-bar">
          <h3>LED 제품</h3>
          <button className="btn-cyan" onClick={() => setShowProductModal(true)}>제품 등록</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>순번</th>
              <th>제품명</th>
              <th>제품 사이즈</th>
              <th>픽셀</th>
              <th>밝기</th>
              <th>전력</th>
              <th>해상도</th>
              <th>수량</th>
              <th>단가</th>
              <th>부가세</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td>{prod.size}</td>
                <td>{prod.pixel}</td>
                <td>{prod.brightness}</td>
                <td>{prod.power}</td>
                <td>{prod.resolution || '480x270'}</td>
                <td>{prod.quantity || 1}</td>
                <td>₩ {prod.price.toLocaleString()}</td>
                <td>₩ {Math.round(prod.price * 0.1).toLocaleString()}</td>
                <td>
                  <button className="btn-small btn-cyan" onClick={() => {
                    setSelectedProduct(prod)
                    setShowProductEditModal(true)
                  }}>수정</button>
                  <button className="btn-small btn-danger" onClick={() => {
                    if (window.confirm('정말 삭제하시겠습니까?')) {
                      setProducts(products.filter(p => p.id !== prod.id))
                    }
                  }}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-section">
        <div className="section-title-bar">
          <h3>VX 프로세서</h3>
          <button className="btn-cyan" onClick={() => setShowProcessorModal(true)}>프로세서 등록</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>모델명</th>
              <th>지원해상도</th>
              <th>랜포트</th>
              <th>단가</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {vxProducts.map(vx => (
              <tr key={vx.id}>
                <td>{vx.id}</td>
                <td>{vx.model}</td>
                <td>{vx.resolution}</td>
                <td>{vx.ports}개</td>
                <td>₩ {vx.price.toLocaleString()}</td>
                <td>
                  <button className="btn-small btn-cyan" onClick={() => {
                    setSelectedProcessor(vx)
                    setShowProcessorEditModal(true)
                  }}>수정</button>
                  <button className="btn-small btn-danger" onClick={() => {
                    if (window.confirm('정말 삭제하시겠습니까?')) {
                      setVxProducts(vxProducts.filter(v => v.id !== vx.id))
                    }
                  }}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPricing = () => {
    const handleLedPriceChange = (productName, newPrice) => {
      setProducts(products.map(p => 
        p.name === productName ? {...p, price: parseInt(newPrice) || 0} : p
      ))
    }

    const handleVxPriceChange = (model, newPrice) => {
      setVxProducts(vxProducts.map(v => 
        v.model === model ? {...v, price: parseInt(newPrice) || 0} : v
      ))
    }

    return (
      <div className="admin-section">
        <h2>단가 관리</h2>
        
        <div className="pricing-card">
          <h3>LED 단가</h3>
          {products.map(prod => (
            <div className="pricing-row" key={prod.id}>
              <label>{prod.name}</label>
              <input type="number" value={prod.price} 
                     onChange={(e) => handleLedPriceChange(prod.name, e.target.value)} />
              <span>원</span>
            </div>
          ))}
        </div>

        <div className="pricing-card">
          <h3>VX 프로세서 단가</h3>
          {vxProducts.map(vx => (
            <div className="pricing-row" key={vx.id}>
              <label>{vx.model}</label>
              <input type="number" value={vx.price} 
                     onChange={(e) => handleVxPriceChange(vx.model, e.target.value)} />
              <span>원</span>
            </div>
          ))}
        </div>

        <div className="pricing-card">
        <h3>시공비 단가</h3>
        <div className="pricing-row">
          <label>인당/일</label>
          <input type="number" defaultValue={300000} />
          <span>원</span>
        </div>
      </div>

      <button className="btn-cyan btn-large">저장</button>
    </div>
    )
  }

  const renderSettings = () => (
    <div className="admin-section">
      <h2>설정</h2>
      
      <div className="settings-card">
        <h3>회사 정보</h3>
        <div className="setting-row">
          <label>회사명</label>
          <input type="text" defaultValue="(주)이지텍인터내셔널" />
        </div>
        <div className="setting-row">
          <label>주소</label>
          <input type="text" defaultValue="경기도 남양주시 화도읍 재재기로 190번길 32" />
        </div>
        <div className="setting-row">
          <label>전화</label>
          <input type="text" defaultValue="02-6258-1600" />
        </div>
        <div className="setting-row">
          <label>이메일</label>
          <input type="text" defaultValue="izt@iztec.co.kr" />
        </div>
      </div>

      <div className="settings-card">
        <h3>견적서 설정</h3>
        <div className="setting-row">
          <label>견적 유효기간</label>
          <input type="text" defaultValue="15일" />
        </div>
        <div className="setting-row">
          <label>결제 조건</label>
          <input type="text" defaultValue="발주시 계약금 60%, 잔금 40%" />
        </div>
        <div className="setting-row">
          <label>A/S 기간</label>
          <input type="text" defaultValue="납기일로부터 2년 무상" />
        </div>
      </div>

      <div className="settings-card">
        <h3>이메일 설정</h3>
        <div className="setting-row">
          <label>SMTP 서버</label>
          <input type="text" defaultValue="smtp.gmail.com" />
        </div>
        <div className="setting-row">
          <label>포트</label>
          <input type="text" defaultValue="587" />
        </div>
        <div className="setting-row">
          <label>이메일</label>
          <input type="text" defaultValue="izt@iztec.co.kr" />
        </div>
        <div className="setting-row">
          <label>비밀번호</label>
          <input type="password" placeholder="앱 비밀번호 입력" />
        </div>
      </div>

      <button className="btn-cyan btn-large">저장</button>
    </div>
  )

  const renderProductRegister = () => {
    return (
      <div className="admin-section">
        <h2>제품 등록</h2>
        
        <div style={{display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #e0e0e0'}}>
          <button 
            onClick={() => setRegisterTab('led')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: registerTab === 'led' ? '#4ECDC4' : 'transparent',
              color: registerTab === 'led' ? 'white' : '#666',
              cursor: 'pointer',
              fontWeight: '500',
              borderRadius: '4px 4px 0 0',
              transition: 'all 0.2s'
            }}
          >
            LED 제품 등록
          </button>
          <button 
            onClick={() => setRegisterTab('processor')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: registerTab === 'processor' ? '#4ECDC4' : 'transparent',
              color: registerTab === 'processor' ? 'white' : '#666',
              cursor: 'pointer',
              fontWeight: '500',
              borderRadius: '4px 4px 0 0',
              transition: 'all 0.2s'
            }}
          >
            프로세서 등록
          </button>
        </div>

        {registerTab === 'led' && (
          <div className="product-register-page">
            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
              <div className="register-row">
                <div className="register-label">제품명</div>
                <input type="text" className="register-input" />
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper">
                  <input type="text" className="register-input file-input-display" value={fileName} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('fileInput2').click()}>첨부</button>
                  <input type="file" id="fileInput2" accept="image/*" style={{display: 'none'}} onChange={handleFileChange} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">제품 사이즈</div>
                <input type="text" className="register-input" />
                <div className="register-label">픽셀</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">밝기</div>
                <input type="text" className="register-input" />
                <div className="register-label">전력</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">해상도</div>
                <input type="text" className="register-input" />
                <div className="register-label">수량</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">단가</div>
                <input type="text" className="register-input" 
                       value={productPrice ? productPrice.toLocaleString() : ''}
                       onChange={(e) => handlePriceChange(e.target.value)} />
                <div className="register-label">부가세</div>
                <input type="text" className="register-input" 
                       value={productTax ? productTax.toLocaleString() : ''} readOnly style={{background: '#f5f5f5'}} />
              </div>
              <div className="register-row-full">
                <div className="register-label">합계</div>
                <input type="text" className="register-input-full" 
                       value={productTotal ? productTotal.toLocaleString() : ''} readOnly style={{background: '#f5f5f5'}} />
              </div>
              <div className="register-buttons">
                <button type="button" className="btn-cyan btn-large">등록</button>
              </div>
            </form>
          </div>
        )}

        {registerTab === 'processor' && (
          <div className="product-register-page">
            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
              <div className="register-row">
                <div className="register-label">모델명</div>
                <input type="text" className="register-input" />
                <div className="register-label">지원해상도</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">랜포트</div>
                <input type="text" className="register-input" />
                <div className="register-label">단가</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-buttons">
                <button type="button" className="btn-cyan btn-large">등록</button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }

  const renderAccounts = () => {
    const handleEdit = (account) => {
      setEditingId(account.id)
      setEditForm(account)
    }

    const handleSave = () => {
      setAccounts(accounts.map(a => a.id === editingId ? editForm : a))
      setEditingId(null)
    }

    const handleDelete = (id) => {
      if (confirm('정말 삭제하시겠습니까?')) {
        setAccounts(accounts.filter(a => a.id !== id))
      }
    }

    return (
      <div className="admin-section">
        <h2>계정 관리</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>사용자명</th>
              <th>이메일</th>
              <th>권한</th>
              <th>가입일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>
                  {editingId === account.id ? (
                    <input value={editForm.username} onChange={e => setEditForm({...editForm, username: e.target.value})} />
                  ) : account.username}
                </td>
                <td>
                  {editingId === account.id ? (
                    <input value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                  ) : account.email}
                </td>
                <td>
                  {editingId === account.id ? (
                    <select value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}>
                      <option>관리자</option>
                      <option>일반</option>
                    </select>
                  ) : account.role}
                </td>
                <td>{account.createdAt}</td>
                <td>
                  {editingId === account.id ? (
                    <>
                      <button className="btn-cyan" style={{padding: '4px 12px', fontSize: '13px', marginRight: '4px'}} onClick={handleSave}>저장</button>
                      <button className="btn-gray" style={{padding: '4px 12px', fontSize: '13px'}} onClick={() => setEditingId(null)}>취소</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-cyan" style={{padding: '4px 12px', fontSize: '13px', marginRight: '4px'}} onClick={() => handleEdit(account)}>수정</button>
                      <button className="btn-red" style={{padding: '4px 12px', fontSize: '13px'}} onClick={() => handleDelete(account.id)}>삭제</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="admin-page">
      {showProductModal && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="product-register-modal" onClick={e => e.stopPropagation()}>
            <h2 className="register-title">제품 등록 하기</h2>
            <form className="register-form" onSubmit={(e) => { e.preventDefault(); setShowProductModal(false); }}>
              <div className="register-row">
                <div className="register-label">제품명</div>
                <input type="text" className="register-input" />
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper">
                  <input type="text" className="register-input file-input-display" value={fileName} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('fileInput').click()}>첨부</button>
                  <input type="file" id="fileInput" accept="image/*" style={{display: 'none'}} onChange={handleFileChange} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">제품 사이즈</div>
                <input type="text" className="register-input" />
                <div className="register-label">픽셀</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">밝기</div>
                <input type="text" className="register-input" />
                <div className="register-label">전력</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">해상도</div>
                <input type="text" className="register-input" />
                <div className="register-label">수량</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">단가</div>
                <input type="text" className="register-input" 
                       value={productPrice ? productPrice.toLocaleString() : ''}
                       onChange={(e) => handlePriceChange(e.target.value)} />
                <div className="register-label">부가세</div>
                <input type="text" className="register-input" 
                       value={productTax ? productTax.toLocaleString() : ''} readOnly style={{background: '#f5f5f5'}} />
              </div>
              <div className="register-row-full">
                <div className="register-label">합계</div>
                <input type="text" className="register-input-full" 
                       value={productTotal ? productTotal.toLocaleString() : ''} readOnly style={{background: '#f5f5f5'}} />
              </div>
              <div className="register-buttons">
                <button type="button" className="register-btn-cancel" onClick={() => setShowProductModal(false)}>등록</button>
                <button type="submit" className="register-btn-submit">수정완료</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProductEditModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowProductEditModal(false)}>
          <div className="product-register-modal" onClick={e => e.stopPropagation()}>
            <h2 className="register-title">제품 수정 하기</h2>
            <form className="register-form" onSubmit={(e) => { e.preventDefault(); setShowProductEditModal(false); }}>
              <div className="register-row">
                <div className="register-label">제품명</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.name} />
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper">
                  <input type="text" className="register-input file-input-display" value={fileName} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('fileInputEdit').click()}>첨부</button>
                  <input type="file" id="fileInputEdit" accept="image/*" style={{display: 'none'}} onChange={handleFileChange} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">제품 사이즈</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.size} />
                <div className="register-label">픽셀</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.pixel} />
              </div>
              <div className="register-row">
                <div className="register-label">밝기</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.brightness} />
                <div className="register-label">전력</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.power} />
              </div>
              <div className="register-row">
                <div className="register-label">해상도</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.resolution} />
                <div className="register-label">수량</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.quantity} />
              </div>
              <div className="register-row">
                <div className="register-label">단가</div>
                <input type="text" className="register-input" defaultValue={selectedProduct.price.toLocaleString()} />
                <div className="register-label">부가세</div>
                <input type="text" className="register-input" defaultValue={Math.round(selectedProduct.price * 0.1).toLocaleString()} readOnly style={{background: '#f5f5f5'}} />
              </div>
              <div className="register-row-full">
                <div className="register-label">합계</div>
                <input type="text" className="register-input-full" defaultValue={(selectedProduct.price + Math.round(selectedProduct.price * 0.1)).toLocaleString()} readOnly style={{background: '#f5f5f5'}} />
              </div>
              <div className="register-buttons">
                <button type="button" className="register-btn-cancel" onClick={() => setShowProductEditModal(false)}>취소</button>
                <button type="submit" className="register-btn-submit">수정완료</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProcessorModal && (
        <div className="modal-overlay" onClick={() => setShowProcessorModal(false)}>
          <div className="product-register-modal" onClick={e => e.stopPropagation()}>
            <h2 className="register-title">프로세서 등록 하기</h2>
            <form className="register-form" onSubmit={(e) => { e.preventDefault(); setShowProcessorModal(false); }}>
              <div className="register-row">
                <div className="register-label">모델명</div>
                <input type="text" className="register-input" />
                <div className="register-label">지원해상도</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-row">
                <div className="register-label">랜포트</div>
                <input type="text" className="register-input" />
                <div className="register-label">단가</div>
                <input type="text" className="register-input" />
              </div>
              <div className="register-buttons">
                <button type="button" className="register-btn-cancel" onClick={() => setShowProcessorModal(false)}>등록</button>
                <button type="submit" className="register-btn-submit">수정완료</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProcessorEditModal && selectedProcessor && (
        <div className="modal-overlay" onClick={() => setShowProcessorEditModal(false)}>
          <div className="product-register-modal" onClick={e => e.stopPropagation()}>
            <h2 className="register-title">프로세서 수정 하기</h2>
            <form className="register-form" onSubmit={(e) => { e.preventDefault(); setShowProcessorEditModal(false); }}>
              <div className="register-row">
                <div className="register-label">ID</div>
                <input type="text" className="register-input" defaultValue={selectedProcessor.id || ''} readOnly style={{background: '#f5f5f5'}} />
                <div className="register-label">모델명</div>
                <input type="text" className="register-input" defaultValue={selectedProcessor.model || ''} />
              </div>
              <div className="register-row">
                <div className="register-label">지원해상도</div>
                <input type="text" className="register-input" defaultValue={selectedProcessor.resolution || ''} />
                <div className="register-label">랜포트</div>
                <input type="text" className="register-input" defaultValue={selectedProcessor.ports || ''} />
              </div>
              <div className="register-row-full">
                <div className="register-label">단가</div>
                <input type="text" className="register-input-full" defaultValue={selectedProcessor.price ? selectedProcessor.price.toLocaleString() : ''} />
              </div>
              <div className="register-buttons">
                <button type="button" className="register-btn-cancel" onClick={() => setShowProcessorEditModal(false)}>취소</button>
                <button type="submit" className="register-btn-submit">수정완료</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEstimateEditModal && selectedEstimate && (
        <div className="modal-overlay" onClick={() => setShowEstimateEditModal(false)}>
          <div className="product-register-modal" onClick={e => e.stopPropagation()}>
            <h2 className="register-title">견적 수정 하기</h2>
            <form className="register-form" onSubmit={(e) => { e.preventDefault(); setShowEstimateEditModal(false); }}>
              <div className="register-row">
                <div className="register-label">날짜</div>
                <input type="date" className="register-input" defaultValue={selectedEstimate.date?.replace(/\./g, '-')} />
                <div className="register-label">이지텍 담당자</div>
                <input type="text" className="register-input" defaultValue={selectedEstimate.manager} />
              </div>
              <div className="register-row">
                <div className="register-label">업체명</div>
                <input type="text" className="register-input" defaultValue={selectedEstimate.customer} />
                <div className="register-label">업체 담당자</div>
                <input type="text" className="register-input" defaultValue={selectedEstimate.clientManager || ''} />
              </div>
              <div className="register-row">
                <div className="register-label">연락처</div>
                <input type="text" className="register-input" defaultValue={selectedEstimate.phone || ''} />
                <div className="register-label">메일주소</div>
                <input type="text" className="register-input" defaultValue={selectedEstimate.email || ''} />
              </div>
              <div className="register-row">
                <div className="register-label">의뢰내역</div>
                <input type="text" className="register-input" defaultValue={selectedEstimate.request || ''} />
                <div className="register-label">합계 금액</div>
                <input type="text" className="register-input" defaultValue={selectedEstimate.amount.toLocaleString()} />
              </div>
              <div className="register-buttons">
                <button type="button" className="register-btn-cancel" onClick={() => setShowEstimateEditModal(false)}>취소</button>
                <button type="submit" className="register-btn-submit">수정완료</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedEstimate && (
        <ViewModal 
          formData={defaultFormData} 
          onClose={() => setShowViewModal(false)}
          onQuote={() => {
            setShowViewModal(false)
            setShowQuoteModal(true)
          }}
        />
      )}

      {showQuoteModal && selectedEstimate && (
        <QuoteModal 
          formData={defaultFormData}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
      
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>LED 관리자</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            대시보드
          </button>
          <button 
            className={activeTab === 'estimates' ? 'active' : ''}
            onClick={() => setActiveTab('estimates')}
          >
            등록 자료 보기
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            제품 관리
          </button>
          <button 
            className={activeTab === 'product-register' ? 'active' : ''}
            onClick={() => setActiveTab('product-register')}
          >
            제품 등록
          </button>
          <button 
            className={activeTab === 'pricing' ? 'active' : ''}
            onClick={() => setActiveTab('pricing')}
          >
            단가 관리
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            설정
          </button>
          <button 
            className={activeTab === 'accounts' ? 'active' : ''}
            onClick={() => setActiveTab('accounts')}
          >
            계정 관리
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="admin-inner">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'estimates' && renderEstimates()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'product-register' && renderProductRegister()}
          {activeTab === 'pricing' && renderPricing()}
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'accounts' && renderAccounts()}
        </div>
      </main>
    </div>
  )
}

export default AdminPage
