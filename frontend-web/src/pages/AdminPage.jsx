import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './AdminPage.css'
import './EstimateForm.css'
import modalLogoImg from '../assets/modal-logo2.png'
import modalLogoImg1 from '../assets/modal-logo.png'
import printIconImg from '../assets/print-icon.png'
import stampImg from '../assets/stamp.png'

const API_BASE = 'http://localhost:8080/api'

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
  const [accounts, setAccounts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [registerTab, setRegisterTab] = useState('led')
  const [productForm, setProductForm] = useState({ name: '', sizeW: '', sizeH: '', pixel: '', brightness: '', powerMax: '', powerAvg: '', resW: '', resH: '', price: 0 })
  const [vxForm, setVxForm] = useState({ model: '', resolution: '', ports: '', price: 0 })

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
  const [imageFile, setImageFile] = useState(null)
  const [imageName, setImageName] = useState('')

  const handlePriceChange = (value) => {
    const price = parseInt(value.replace(/[^\d]/g, '')) || 0
    const tax = Math.round(price * 0.1)
    const total = price + tax
    setProductPrice(price)
    setProductTax(tax)
    setProductTotal(total)
  }
  
  const [estimates, setEstimates] = useState([])

  const [products, setProducts] = useState([])

  const [vxProducts, setVxProducts] = useState([])

  const [laborCost, setLaborCost] = useState(300000)

  const [settingsForm, setSettingsForm] = useState({
    companyName: '', companyAddress: '', companyPhone: '', companyEmail: '',
    quoteValidity: '', paymentTerms: '', warrantyPeriod: '',
    smtpServer: '', smtpPort: '', emailAccount: '', emailPassword: ''
  })

  // DB에서 데이터 로드
  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`)
      const data = await res.json()
      if (data.success) {
        const d = data.data
        if (d.laborCostPerDay) setLaborCost(parseInt(d.laborCostPerDay) || 300000)
        setSettingsForm(prev => ({
          companyName: d.companyName || prev.companyName,
          companyAddress: d.companyAddress || prev.companyAddress,
          companyPhone: d.companyPhone || prev.companyPhone,
          companyEmail: d.companyEmail || prev.companyEmail,
          quoteValidity: d.quoteValidity || prev.quoteValidity,
          paymentTerms: d.paymentTerms || prev.paymentTerms,
          warrantyPeriod: d.warrantyPeriod || prev.warrantyPeriod,
          smtpServer: d.smtpServer || prev.smtpServer,
          smtpPort: d.smtpPort || prev.smtpPort,
          emailAccount: d.emailAccount || prev.emailAccount,
          emailPassword: d.emailPassword || ''
        }))
      }
    } catch (e) { console.error('Failed to fetch settings:', e) }
  }

  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE}/accounts`)
      const data = await res.json()
      if (data.success) setAccounts(data.data)
    } catch (e) { console.error('Failed to fetch accounts:', e) }
  }

  useEffect(() => {
    fetchProducts()
    fetchVxProducts()
    fetchEstimates()
    fetchSettings()
    fetchAccounts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/led`)
      const data = await res.json()
      if (data.success) {
        setProducts(data.data.map(p => ({
          id: p.id,
          name: p.name,
          size: p.size,
          pixel: p.pixel,
          brightness: p.brightness,
          power: p.power,
          resolution: p.resolution,
          price: p.unitPrice,
          imageUrl: p.imageUrl
        })))
      }
    } catch (e) { console.error('Failed to fetch products:', e) }
  }

  const fetchVxProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/vx`)
      const data = await res.json()
      if (data.success) {
        setVxProducts(data.data.map(v => ({
          id: v.id,
          model: v.modelName,
          resolution: v.supportResolution,
          ports: v.lanPortCount,
          price: v.unitPrice,
          imageUrl: v.imageUrl
        })))
      }
    } catch (e) { console.error('Failed to fetch vx products:', e) }
  }

  const fetchEstimates = async () => {
    try {
      const res = await fetch(`${API_BASE}/estimates`)
      const data = await res.json()
      if (data.success) {
        setEstimates(data.data.map(e => ({
          id: e.id,
          date: e.date,
          customer: e.clientCompanyName,
          manager: e.managerName,
          clientManager: e.clientManager,
          phone: e.clientMobile,
          email: e.clientEmail,
          request: `${e.productName} / ${e.width}x${e.height}(${e.quantity}ea)`,
          amount: e.totalPrice || 0,
          status: '완료'
        })))
      }
    } catch (e) { console.error('Failed to fetch estimates:', e) }
  }

  const deleteEstimate = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await fetch(`${API_BASE}/estimates/${id}`, { method: 'DELETE' })
      fetchEstimates()
    } catch (e) { console.error('Failed to delete estimate:', e) }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await fetch(`${API_BASE}/products/led/${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (e) { console.error('Failed to delete product:', e) }
  }

  const uploadImage = async () => {
    if (!imageFile) return null
    const formData = new FormData()
    formData.append('file', imageFile)
    try {
      const res = await fetch(`${API_BASE}/products/upload`, { method: 'POST', body: formData })
      const json = await res.json()
      return json.data
    } catch (e) { console.error('Image upload failed:', e); return null }
  }

  const createProduct = async (productData) => {
    if (!productData.name?.trim()) return alert('제품명을 입력하세요')
    if (!productData.sizeW || !productData.sizeH) return alert('제품 사이즈를 입력하세요')
    if (!productData.pixel?.trim()) return alert('픽셀을 입력하세요')
    if (!productData.price || productData.price <= 0) return alert('단가를 입력하세요')
    try {
      const imageUrl = await uploadImage()
      await fetch(`${API_BASE}/products/led`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productData.name,
          size: `${productData.sizeW}x${productData.sizeH}`,
          pixel: productData.pixel,
          brightness: productData.brightness,
          power: `${productData.powerMax}/${productData.powerAvg}`,
          resolution: `${productData.resW}x${productData.resH}`,
          unitPrice: productData.price,
          imageUrl
        })
      })
      fetchProducts()
      setImageFile(null); setImageName('')
      return true
    } catch (e) { console.error('Failed to create product:', e) }
  }

  const updateProduct = async (id, productData) => {
    if (!productData.name?.trim()) return alert('제품명을 입력하세요')
    if (!productData.sizeW || !productData.sizeH) return alert('제품 사이즈를 입력하세요')
    if (!productData.pixel?.trim()) return alert('픽셀을 입력하세요')
    if (!productData.price || productData.price <= 0) return alert('단가를 입력하세요')
    try {
      const imageUrl = await uploadImage() || productData.imageUrl
      await fetch(`${API_BASE}/products/led/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productData.name,
          size: `${productData.sizeW}x${productData.sizeH}`,
          pixel: productData.pixel,
          brightness: productData.brightness,
          power: `${productData.powerMax}/${productData.powerAvg}`,
          resolution: `${productData.resW}x${productData.resH}`,
          unitPrice: productData.price,
          imageUrl
        })
      })
      fetchProducts()
      setImageFile(null); setImageName('')
      return true
    } catch (e) { console.error('Failed to update product:', e) }
  }

  const createVxProduct = async (vxData) => {
    if (!vxData.model?.trim()) return alert('모델명을 입력하세요')
    if (!vxData.resolution?.trim()) return alert('지원해상도를 입력하세요')
    if (!vxData.ports || vxData.ports <= 0) return alert('랜포트를 입력하세요')
    if (!vxData.price || vxData.price <= 0) return alert('단가를 입력하세요')
    try {
      const imageUrl = await uploadImage()
      await fetch(`${API_BASE}/products/vx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelName: vxData.model,
          supportResolution: vxData.resolution,
          lanPortCount: vxData.ports,
          unitPrice: vxData.price,
          imageUrl
        })
      })
      fetchVxProducts()
      setImageFile(null); setImageName('')
      return true
    } catch (e) { console.error('Failed to create vx product:', e) }
  }

  const updateVxProduct = async (id, vxData) => {
    if (!vxData.model?.trim()) return alert('모델명을 입력하세요')
    if (!vxData.resolution?.trim()) return alert('지원해상도를 입력하세요')
    if (!vxData.ports || vxData.ports <= 0) return alert('랜포트를 입력하세요')
    if (!vxData.price || vxData.price <= 0) return alert('단가를 입력하세요')
    try {
      const imageUrl = await uploadImage() || vxData.imageUrl
      await fetch(`${API_BASE}/products/vx/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelName: vxData.model,
          supportResolution: vxData.resolution,
          lanPortCount: vxData.ports,
          unitPrice: vxData.price,
          imageUrl
        })
      })
      fetchVxProducts()
      setImageFile(null); setImageName('')
      return true
    } catch (e) { console.error('Failed to update vx product:', e) }
  }

  const deleteVxProduct = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await fetch(`${API_BASE}/products/vx/${id}`, { method: 'DELETE' })
      fetchVxProducts()
    } catch (e) { console.error('Failed to delete vx product:', e) }
  }

  const renderDashboard = () => {
    const totalAmount = estimates.reduce((sum, e) => sum + (e.amount || 0), 0)
    const formatAmount = (n) => {
      if (n >= 100000000) return `₩ ${(n / 100000000).toFixed(1)}억`
      if (n >= 10000) return `₩ ${(n / 10000).toLocaleString()}만`
      return `₩ ${n.toLocaleString()}`
    }
    
    return (
    <div className="admin-section">
      <h2>대시보드</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>전체 견적</h3>
          <p className="stat-value">{estimates.length}</p>
        </div>
        <div className="stat-card">
          <h3>등록 제품</h3>
          <p className="stat-value">{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>총 매출</h3>
          <p className="stat-value">{formatAmount(totalAmount)}</p>
        </div>
        <div className="stat-card">
          <h3>프로세서</h3>
          <p className="stat-value">{vxProducts.length}</p>
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
                <td>₩ {(est.amount || 0).toLocaleString()}</td>
                <td><span className={`status-badge ${est.status}`}>{est.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
  }

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
                <button style={{padding: '4px 8px', fontSize: '12px', marginRight: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer', background: '#dc3545', color: 'white'}} onClick={() => deleteEstimate(est.id)}>삭제</button>
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
              <th style={{minWidth: '140px'}}>이미지</th>
              <th>제품명</th>
              <th>제품 사이즈</th>
              <th>픽셀</th>
              <th style={{width: '50px', whiteSpace: 'nowrap'}}>밝기</th>
              <th style={{width: '50px', whiteSpace: 'nowrap'}}>전력</th>
              <th style={{width: '55px', whiteSpace: 'nowrap'}}>해상도</th>
              <th>수량</th>
              <th style={{minWidth: '120px', whiteSpace: 'nowrap'}}>단가</th>
              <th style={{minWidth: '120px', whiteSpace: 'nowrap'}}>부가세</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.imageUrl ? <img src={`http://localhost:8080${prod.imageUrl}`} alt={prod.name} style={{width: '130px', height: '130px', objectFit: 'contain', borderRadius: '4px'}} /> : '-'}</td>
                <td>{prod.name}</td>
                <td>{prod.size}</td>
                <td>{prod.pixel}</td>
                <td>{prod.brightness}</td>
                <td>{prod.power}</td>
                <td>{prod.resolution || '480x270'}</td>
                <td>{prod.quantity || 1}</td>
                <td style={{whiteSpace: 'nowrap'}}>₩ {prod.price.toLocaleString()}</td>
                <td style={{whiteSpace: 'nowrap'}}>₩ {Math.round(prod.price * 0.1).toLocaleString()}</td>
                <td>
                  <button className="btn-small btn-cyan" onClick={() => {
                    setSelectedProduct(prod)
                    const [sizeW, sizeH] = (prod.size || '').split('x')
                    const [powerMax, powerAvg] = (prod.power || '').split('/')
                    const [resW, resH] = (prod.resolution || '').split('x')
                    setProductForm({ name: prod.name, sizeW: sizeW || '', sizeH: sizeH || '', pixel: prod.pixel, brightness: prod.brightness, powerMax: powerMax || '', powerAvg: powerAvg || '', resW: resW || '', resH: resH || '', price: prod.price, imageUrl: prod.imageUrl || '' })
                    setImageFile(null); setImageName('')
                    setShowProductEditModal(true)
                  }}>수정</button>
                  <button className="btn-small btn-danger" onClick={() => deleteProduct(prod.id)}>삭제</button>
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
              <th>이미지</th>
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
                <td>{vx.imageUrl ? <img src={`http://localhost:8080${vx.imageUrl}`} alt={vx.model} style={{width: '130px', height: '130px', objectFit: 'contain', borderRadius: '4px'}} /> : '-'}</td>
                <td>{vx.model}</td>
                <td>{vx.resolution}</td>
                <td>{vx.ports}개</td>
                <td>₩ {vx.price.toLocaleString()}</td>
                <td>
                  <button className="btn-small btn-cyan" onClick={() => {
                    setSelectedProcessor(vx)
                    setVxForm({ model: vx.model, resolution: vx.resolution, ports: vx.ports, price: vx.price, imageUrl: vx.imageUrl || '' })
                    setImageFile(null); setImageName('')
                    setShowProcessorEditModal(true)
                  }}>수정</button>
                  <button className="btn-small btn-danger" onClick={() => deleteVxProduct(vx.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPricing = () => {
    const handleLedPriceChange = (productId, newPrice) => {
      setProducts(products.map(p => 
        p.id === productId ? {...p, price: parseInt(newPrice) || 0} : p
      ))
    }

    const handleVxPriceChange = (vxId, newPrice) => {
      setVxProducts(vxProducts.map(v => 
        v.id === vxId ? {...v, price: parseInt(newPrice) || 0} : v
      ))
    }

    const handleSavePricing = async () => {
      try {
        const ledPrices = {}
        products.forEach(p => { ledPrices[p.id] = p.price })
        const vxPrices = {}
        vxProducts.forEach(v => { vxPrices[v.id] = v.price })

        await Promise.all([
          fetch(`${API_BASE}/products/led/prices`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ledPrices)
          }),
          fetch(`${API_BASE}/products/vx/prices`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vxPrices)
          }),
          fetch(`${API_BASE}/settings`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ laborCostPerDay: String(laborCost) })
          })
        ])
        alert('단가가 저장되었습니다.')
      } catch (e) { console.error('Failed to save pricing:', e) }
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
                     onChange={(e) => handleLedPriceChange(prod.id, e.target.value)} />
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
                     onChange={(e) => handleVxPriceChange(vx.id, e.target.value)} />
              <span>원</span>
            </div>
          ))}
        </div>

        <div className="pricing-card">
        <h3>시공비 단가</h3>
        <div className="pricing-row">
          <label>인당/일</label>
          <input type="number" value={laborCost} onChange={e => setLaborCost(parseInt(e.target.value) || 0)} />
          <span>원</span>
        </div>
      </div>

      <button className="btn-cyan btn-large" onClick={handleSavePricing}>저장</button>
    </div>
    )
  }

  const renderSettings = () => {
    const sf = settingsForm
    const set = (key, val) => setSettingsForm({...sf, [key]: val})

    const handleSaveSettings = async () => {
      try {
        const payload = {...sf}
        if (!payload.emailPassword) delete payload.emailPassword
        await fetch(`${API_BASE}/settings`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        alert('설정이 저장되었습니다.')
      } catch (e) { console.error('Failed to save settings:', e) }
    }

    return (
    <div className="admin-section">
      <h2>설정</h2>
      
      <div className="settings-card">
        <h3>회사 정보</h3>
        <div className="setting-row">
          <label>회사명</label>
          <input type="text" value={sf.companyName} onChange={e => set('companyName', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>주소</label>
          <input type="text" value={sf.companyAddress} onChange={e => set('companyAddress', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>전화</label>
          <input type="text" value={sf.companyPhone} onChange={e => set('companyPhone', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>이메일</label>
          <input type="text" value={sf.companyEmail} onChange={e => set('companyEmail', e.target.value)} />
        </div>
      </div>

      <div className="settings-card">
        <h3>견적서 설정</h3>
        <div className="setting-row">
          <label>견적 유효기간</label>
          <input type="text" value={sf.quoteValidity} onChange={e => set('quoteValidity', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>결제 조건</label>
          <input type="text" value={sf.paymentTerms} onChange={e => set('paymentTerms', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>A/S 기간</label>
          <input type="text" value={sf.warrantyPeriod} onChange={e => set('warrantyPeriod', e.target.value)} />
        </div>
      </div>

      <div className="settings-card">
        <h3>이메일 설정</h3>
        <div className="setting-row">
          <label>SMTP 서버</label>
          <input type="text" value={sf.smtpServer} onChange={e => set('smtpServer', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>포트</label>
          <input type="text" value={sf.smtpPort} onChange={e => set('smtpPort', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>이메일</label>
          <input type="text" value={sf.emailAccount} onChange={e => set('emailAccount', e.target.value)} />
        </div>
        <div className="setting-row">
          <label>앱 비밀번호</label>
          <input type="password" value={sf.emailPassword} onChange={e => set('emailPassword', e.target.value)} placeholder="변경 시에만 입력" />
        </div>
      </div>

      <button className="btn-cyan btn-large" onClick={handleSaveSettings}>저장</button>
    </div>
    )
  }

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
            <form className="register-form" onSubmit={async (e) => {
              e.preventDefault()
              const result = await createProduct({...productForm, price: productPrice})
              if (result) {
                setProductForm({ name: '', sizeW: '', sizeH: '', pixel: '', brightness: '', powerMax: '', powerAvg: '', resW: '', resH: '', price: 0 })
                setProductPrice(0); setProductTax(0); setProductTotal(0)
                alert('제품이 등록되었습니다.')
              }
            }}>
              <div className="register-row">
                <div className="register-label">제품명</div>
                <input type="text" className="register-input" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper">
                  <input type="text" className="register-input file-input-display" value={imageName} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('imageInput').click()}>첨부</button>
                  <input type="file" id="imageInput" accept="image/*" style={{display: 'none'}} onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImageName(f.name) }}} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">제품 사이즈</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.sizeW} onChange={e => setProductForm({...productForm, sizeW: e.target.value})} placeholder="W" />
                  <span>x</span>
                  <input type="number" value={productForm.sizeH} onChange={e => setProductForm({...productForm, sizeH: e.target.value})} placeholder="H" />
                </div>
                <div className="register-label">픽셀</div>
                <input type="text" className="register-input" value={productForm.pixel} onChange={e => setProductForm({...productForm, pixel: e.target.value})} />
              </div>
              <div className="register-row">
                <div className="register-label">밝기</div>
                <input type="text" className="register-input" value={productForm.brightness} onChange={e => setProductForm({...productForm, brightness: e.target.value})} />
                <div className="register-label">전력</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.powerMax} onChange={e => setProductForm({...productForm, powerMax: e.target.value})} placeholder="최대" />
                  <span>/</span>
                  <input type="number" value={productForm.powerAvg} onChange={e => setProductForm({...productForm, powerAvg: e.target.value})} placeholder="평균" />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">해상도</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.resW} onChange={e => setProductForm({...productForm, resW: e.target.value})} placeholder="W" />
                  <span>x</span>
                  <input type="number" value={productForm.resH} onChange={e => setProductForm({...productForm, resH: e.target.value})} placeholder="H" />
                </div>
                <div className="register-label">수량</div>
                <input type="text" className="register-input" value={productForm.quantity || ''} onChange={e => setProductForm({...productForm, quantity: e.target.value})} />
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
                <button type="submit" className="btn-cyan btn-large">등록</button>
              </div>
            </form>
          </div>
        )}

        {registerTab === 'processor' && (
          <div className="product-register-page">
            <form className="register-form" onSubmit={async (e) => {
              e.preventDefault()
              const result = await createVxProduct(vxForm)
              if (result) {
                setVxForm({ model: '', resolution: '', ports: '', price: 0 })
                alert('프로세서가 등록되었습니다.')
              }
            }}>
              <div className="register-row">
                <div className="register-label">모델명</div>
                <input type="text" className="register-input" value={vxForm.model} onChange={e => setVxForm({...vxForm, model: e.target.value})} />
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper">
                  <input type="text" className="register-input file-input-display" value={imageName} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('vxImageInput').click()}>첨부</button>
                  <input type="file" id="vxImageInput" accept="image/*" style={{display: 'none'}} onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImageName(f.name) }}} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">지원해상도</div>
                <input type="text" className="register-input" value={vxForm.resolution} onChange={e => setVxForm({...vxForm, resolution: e.target.value})} />
                <div className="register-label">랜포트</div>
                <input type="number" className="register-input" value={vxForm.ports} onChange={e => setVxForm({...vxForm, ports: parseInt(e.target.value) || 0})} />
              </div>
              <div className="register-row-full">
                <div className="register-label">단가</div>
                <input type="number" className="register-input-full" value={vxForm.price} onChange={e => setVxForm({...vxForm, price: parseInt(e.target.value) || 0})} />
              </div>
              <div className="register-buttons">
                <button type="submit" className="btn-cyan btn-large">등록</button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }

  const renderAccounts = () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    const isAdmin = currentUser.role === '마스터'

    const handleEdit = (account) => {
      setEditingId(account.id)
      setEditForm({...account})
    }

    const handleSave = async () => {
      try {
        await fetch(`${API_BASE}/accounts/${editingId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editForm)
        })
        fetchAccounts()
        setEditingId(null)
      } catch (e) { console.error('Failed to update account:', e) }
    }

    const handleDelete = async (id) => {
      if (!confirm('정말 삭제하시겠습니까?')) return
      try {
        await fetch(`${API_BASE}/accounts/${id}`, { method: 'DELETE' })
        fetchAccounts()
      } catch (e) { console.error('Failed to delete account:', e) }
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
                  {editingId === account.id && isAdmin && account.role !== '마스터' ? (
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
                      {isAdmin && (
                        <>
                          <button className="btn-cyan" style={{padding: '4px 12px', fontSize: '13px', marginRight: '4px'}} onClick={() => handleEdit(account)}>수정</button>
                          {account.role !== '마스터' && (
                            <button className="btn-red" style={{padding: '4px 12px', fontSize: '13px'}} onClick={() => handleDelete(account.id)}>삭제</button>
                          )}
                        </>
                      )}
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
            <form className="register-form" onSubmit={async (e) => { 
              e.preventDefault()
              const result = await createProduct(productForm)
              if (result) {
                setProductForm({ name: '', sizeW: '', sizeH: '', pixel: '', brightness: '', powerMax: '', powerAvg: '', resW: '', resH: '', price: 0 })
                setShowProductModal(false)
              }
            }}>
              <div className="register-row-full">
                <div className="register-label">제품명</div>
                <input type="text" className="register-input-full" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
              </div>
              <div className="register-row-full">
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper" style={{flex: 1}}>
                  <input type="text" className="register-input file-input-display" value={imageName} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('modalImageInput').click()}>첨부</button>
                  <input type="file" id="modalImageInput" accept="image/*" style={{display: 'none'}} onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImageName(f.name) }}} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">픽셀</div>
                <input type="text" className="register-input" value={productForm.pixel} onChange={e => setProductForm({...productForm, pixel: e.target.value})} />
                <div className="register-label">밝기</div>
                <input type="text" className="register-input" value={productForm.brightness} onChange={e => setProductForm({...productForm, brightness: e.target.value})} />
              </div>
              <div className="register-row-full">
                <div className="register-label">제품 사이즈</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.sizeW} onChange={e => setProductForm({...productForm, sizeW: e.target.value})} placeholder="W" />
                  <span>x</span>
                  <input type="number" value={productForm.sizeH} onChange={e => setProductForm({...productForm, sizeH: e.target.value})} placeholder="H" />
                </div>
              </div>
              <div className="register-row-full">
                <div className="register-label">전력</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.powerMax} onChange={e => setProductForm({...productForm, powerMax: e.target.value})} placeholder="최대" />
                  <span>/</span>
                  <input type="number" value={productForm.powerAvg} onChange={e => setProductForm({...productForm, powerAvg: e.target.value})} placeholder="평균" />
                </div>
              </div>
              <div className="register-row-full">
                <div className="register-label">해상도</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.resW} onChange={e => setProductForm({...productForm, resW: e.target.value})} placeholder="W" />
                  <span>x</span>
                  <input type="number" value={productForm.resH} onChange={e => setProductForm({...productForm, resH: e.target.value})} placeholder="H" />
                </div>
              </div>
              <div className="register-row-full">
                <div className="register-label">단가</div>
                <input type="number" className="register-input-full" value={productForm.price} onChange={e => setProductForm({...productForm, price: parseInt(e.target.value) || 0})} />
              </div>
              <div className="register-buttons">
                <button type="button" className="register-btn-cancel" onClick={() => setShowProductModal(false)}>취소</button>
                <button type="submit" className="register-btn-submit">등록</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProductEditModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowProductEditModal(false)}>
          <div className="product-register-modal" onClick={e => e.stopPropagation()}>
            <h2 className="register-title">제품 수정 하기</h2>
            <form className="register-form" onSubmit={async (e) => { 
              e.preventDefault()
              const result = await updateProduct(selectedProduct.id, productForm)
              if (result) setShowProductEditModal(false)
            }}>
              <div className="register-row-full">
                <div className="register-label">제품명</div>
                <input type="text" className="register-input-full" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
              </div>
              <div className="register-row-full">
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper" style={{flex: 1}}>
                  <input type="text" className="register-input file-input-display" value={imageName || (selectedProduct.imageUrl ? '기존 이미지 있음' : '')} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('modalEditImageInput').click()}>첨부</button>
                  <input type="file" id="modalEditImageInput" accept="image/*" style={{display: 'none'}} onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImageName(f.name) }}} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">픽셀</div>
                <input type="text" className="register-input" value={productForm.pixel} onChange={e => setProductForm({...productForm, pixel: e.target.value})} />
                <div className="register-label">밝기</div>
                <input type="text" className="register-input" value={productForm.brightness} onChange={e => setProductForm({...productForm, brightness: e.target.value})} />
              </div>
              <div className="register-row-full">
                <div className="register-label">제품 사이즈</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.sizeW} onChange={e => setProductForm({...productForm, sizeW: e.target.value})} placeholder="W" />
                  <span>x</span>
                  <input type="number" value={productForm.sizeH} onChange={e => setProductForm({...productForm, sizeH: e.target.value})} placeholder="H" />
                </div>
              </div>
              <div className="register-row-full">
                <div className="register-label">전력</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.powerMax} onChange={e => setProductForm({...productForm, powerMax: e.target.value})} placeholder="최대" />
                  <span>/</span>
                  <input type="number" value={productForm.powerAvg} onChange={e => setProductForm({...productForm, powerAvg: e.target.value})} placeholder="평균" />
                </div>
              </div>
              <div className="register-row-full">
                <div className="register-label">해상도</div>
                <div className="register-input-split">
                  <input type="number" value={productForm.resW} onChange={e => setProductForm({...productForm, resW: e.target.value})} placeholder="W" />
                  <span>x</span>
                  <input type="number" value={productForm.resH} onChange={e => setProductForm({...productForm, resH: e.target.value})} placeholder="H" />
                </div>
              </div>
              <div className="register-row-full">
                <div className="register-label">단가</div>
                <input type="number" className="register-input-full" value={productForm.price} onChange={e => setProductForm({...productForm, price: parseInt(e.target.value) || 0})} />
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
            <form className="register-form" onSubmit={async (e) => { 
              e.preventDefault()
              const result = await createVxProduct(vxForm)
              if (result) {
                setVxForm({ model: '', resolution: '', ports: '', price: 0 })
                setShowProcessorModal(false)
              }
            }}>
              <div className="register-row-full">
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper" style={{flex: 1}}>
                  <input type="text" className="register-input file-input-display" value={imageName} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('modalVxImageInput').click()}>첨부</button>
                  <input type="file" id="modalVxImageInput" accept="image/*" style={{display: 'none'}} onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImageName(f.name) }}} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">모델명</div>
                <input type="text" className="register-input" value={vxForm.model} onChange={e => setVxForm({...vxForm, model: e.target.value})} />
                <div className="register-label">지원해상도</div>
                <input type="text" className="register-input" value={vxForm.resolution} onChange={e => setVxForm({...vxForm, resolution: e.target.value})} />
              </div>
              <div className="register-row">
                <div className="register-label">랜포트</div>
                <input type="number" className="register-input" value={vxForm.ports} onChange={e => setVxForm({...vxForm, ports: parseInt(e.target.value) || 0})} />
                <div className="register-label">단가</div>
                <input type="number" className="register-input" value={vxForm.price} onChange={e => setVxForm({...vxForm, price: parseInt(e.target.value) || 0})} />
              </div>
              <div className="register-buttons">
                <button type="button" className="register-btn-cancel" onClick={() => setShowProcessorModal(false)}>취소</button>
                <button type="submit" className="register-btn-submit">등록</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProcessorEditModal && selectedProcessor && (
        <div className="modal-overlay" onClick={() => setShowProcessorEditModal(false)}>
          <div className="product-register-modal" onClick={e => e.stopPropagation()}>
            <h2 className="register-title">프로세서 수정 하기</h2>
            <form className="register-form" onSubmit={async (e) => { 
              e.preventDefault()
              const result = await updateVxProduct(selectedProcessor.id, vxForm)
              if (result) setShowProcessorEditModal(false)
            }}>
              <div className="register-row-full">
                <div className="register-label">제품 이미지</div>
                <div className="register-file-wrapper" style={{flex: 1}}>
                  <input type="text" className="register-input file-input-display" value={imageName || (selectedProcessor.imageUrl ? '기존 이미지 있음' : '')} readOnly />
                  <button type="button" className="file-btn-inside" onClick={() => document.getElementById('modalVxEditImageInput').click()}>첨부</button>
                  <input type="file" id="modalVxEditImageInput" accept="image/*" style={{display: 'none'}} onChange={e => { const f = e.target.files[0]; if (f) { setImageFile(f); setImageName(f.name) }}} />
                </div>
              </div>
              <div className="register-row">
                <div className="register-label">모델명</div>
                <input type="text" className="register-input" value={vxForm.model} onChange={e => setVxForm({...vxForm, model: e.target.value})} />
                <div className="register-label">지원해상도</div>
                <input type="text" className="register-input" value={vxForm.resolution} onChange={e => setVxForm({...vxForm, resolution: e.target.value})} />
              </div>
              <div className="register-row">
                <div className="register-label">랜포트</div>
                <input type="number" className="register-input" value={vxForm.ports} onChange={e => setVxForm({...vxForm, ports: parseInt(e.target.value) || 0})} />
                <div className="register-label">단가</div>
                <input type="number" className="register-input" value={vxForm.price} onChange={e => setVxForm({...vxForm, price: parseInt(e.target.value) || 0})} />
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
