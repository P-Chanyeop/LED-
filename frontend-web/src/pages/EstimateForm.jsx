import {useState, useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'
import './EstimateForm.css'
import modalLogoImg from '../assets/modal-logo2.png'
import modalLogoImg1 from '../assets/modal-logo.png'
import printIconImg from '../assets/print-icon.png'
import stampImg from '../assets/stamp.png'
function QuoteModal({formData, products, vxProducts, onClose}) {
    const prod = products?.find(p => p.name === formData.productName)
    const vx = vxProducts?.find(v => v.modelName === formData.processorModel)
    const unitPrice = formData.unitPrice || 0
    const ledQty = formData.totalPanels
    const ledSqm = Math.round((formData.ledSizeW * formData.ledSizeH) / 1000000 * 100) / 100
    const ledTotal = unitPrice * ledQty
    const panelSqm = formData.productSize ? formData.productSize.split('x').map(Number).reduce((a,b) => a * b) / 1000000 : 0
    const sqmPrice = panelSqm > 0 ? Math.round(Math.floor(1 / panelSqm * 100000) / 100000 * unitPrice) : 0
    const processorPrice = formData.processorPrice || 0
    const laborPrice = formData.laborPrice || 300000
    
    const laborQty = formData.installPersonnel
    const sqmTotal = Math.round(sqmPrice * ledSqm)
    const sub1 = ledTotal + sqmTotal
    const sub2 = processorPrice
    const sub3 = laborPrice * laborQty
    const sub4 = formData.materialCost || 0
    const sub5 = formData.travelCost || 0
    const grandTotal = sub1 + sub2 + sub3 + sub4 + sub5
    const addCost = sub3 + sub4 + sub5
    const fmt = (n) => n.toLocaleString()
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="quote-wrapper" onClick={e => e.stopPropagation()}>
                <div className="quote-outer">
                    {/* 헤더 */}
                    <div className="quote-header">
                        <button className="modal-print-btn" title="인쇄하기" style={{flexShrink: 0}} onClick={() => window.print()}>
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
                                <td rowSpan={2} className="qi-product" style={{textAlign:"center"}}>{prod?.imageUrl && <img src={`http://localhost:8080${prod.imageUrl}`} alt={formData.productName} style={{maxWidth:"100%",maxHeight:"40px"}}/>}<br/><span style={{fontSize:"11px"}}>{formData.productName}</span></td>
                                <td className="qi-center">{formData.productSize}</td>
                                <td className="qi-center">{ledQty}</td>
                                <td className="qi-right">₩      {fmt(unitPrice)}</td>
                                <td className="qi-right" rowSpan={2}>₩      {fmt(sub1)}</td>
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
                                <td className="qi-product" style={{textAlign:"center"}}>{vx?.imageUrl && <img src={`http://localhost:8080${vx.imageUrl}`} alt={formData.processorModel} style={{maxWidth:"100%",maxHeight:"40px"}}/>}<br/><span style={{fontSize:"11px"}}>{formData.processorModel}</span></td>
                                <td className="qi-center">EA</td>
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
                                <td className="qi-center">EA</td>
                                <td className="qi-center">1</td>
                                <td className="qi-right">₩      {fmt(sub4)}</td>
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
                                    className="qt-num">{fmt(grandTotal)}</span></td>
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
    const maxGridW = 600
    const maxGridH = 360
    const gap = 2
    const padding = 2
    const panelW = (maxGridW - (formData.width - 1) * gap - padding * 2) / formData.width
    const panelH = (maxGridH - (formData.height - 1) * gap - padding * 2) / formData.height
    const gridW = maxGridW
    const gridH = maxGridH
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            {/* 바깥 흰 박스 */}
            <div className="modal-outer" onClick={e => e.stopPropagation()}>
                {/* 큰 민트 테두리 - 전체 감쌈 */}
                <div className="modal-border-outer">
                    {/* 헤더: 인쇄버튼(좌 끝) + 로고(중앙 왼쪽) */}
                    <div className="modal-header">
                        <button className="modal-print-btn" title="인쇄하기" onClick={() => window.print()}>
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
function EstimateForm() {
    const [formData, setFormData] = useState({
        date: '',
        manager: '',
        department: '',
        companyPhone: '',
        mobilePhone: '',
        email: '',
        companyAddress: '',
        attachment: '',
        clientCompany: '',
        clientDepartment: '',
        clientManager: '',
        clientPhone: '',
        clientMobile: '',
        clientEmail: '',
        businessCard: '',
        installDate: '',
        installPeriod: '',
        installLocation: '',
        installDetailLocation: '',
        etcContent: '',
        productName: '',
        unitPrice: 0,
        productImage: '',
        productSize: '',
        pixel: '',
        brightness: '',
        power: '',
        resolution: '',
        width: 1,
        height: 1,
        totalPanels: 0,
        ledSizeW: '',
        ledSizeH: '',
        ledResW: '',
        ledResH: '',
        totalPower: 0,
        installPersonnel: 1,
        laborPrice: 300000,
        processorModel: '',
        processorQuantity: 1,
        processorPrice: 0,
        processorImage: '',
        installPlace: '',
        travelCost: 0,
        materialCost: 0
    })
    const [managers, setManagers] = useState([])
    const [products, setProducts] = useState([])
    const [vxProducts, setVxProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/api/managers')
            .then(r => r.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setManagers(data.data)
                    const m = data.data[0]
                    setFormData(prev => ({...prev, manager: m.name, department: m.department, companyPhone: m.phone, mobilePhone: m.mobile, email: m.email, companyAddress: m.address}))
                }
            })
            .catch(e => console.error('Failed to fetch managers:', e))
        fetch('http://localhost:8080/api/products/led')
            .then(r => r.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setProducts(data.data)
                }
            })
            .catch(e => console.error('Failed to fetch products:', e))
        fetch('http://localhost:8080/api/products/vx')
            .then(r => r.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setVxProducts(data.data)
                    const v = data.data[0]
                    setFormData(prev => ({...prev, processorModel: v.modelName, processorPrice: v.unitPrice}))
                }
            })
            .catch(e => console.error('Failed to fetch vx products:', e))
        fetch('http://localhost:8080/api/settings')
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    if (data.data.laborCostPerDay) setFormData(prev => ({...prev, laborPrice: parseInt(data.data.laborCostPerDay) || 300000}))
                    if (data.data.defaultAttachment) setFormData(prev => prev.attachment ? prev : ({...prev, attachment: data.data.defaultAttachment}))
                }
            })
            .catch(e => console.error('Failed to fetch settings:', e))
    }, [])
    const handleManagerSelect = (name) => {
        const m = managers.find(mg => mg.name === name)
        if (m) setFormData(prev => ({...prev, manager: m.name, department: m.department, companyPhone: m.phone, mobilePhone: m.mobile, email: m.email, companyAddress: m.address}))
    }
    const handleChange = (field, value) => {
        setFormData(prev => {
            const newData = {...prev, [field]: value}
            if (field === 'productName') {
                const p = products.find(pr => pr.name === value)
                if (!p) {
                    newData.unitPrice = 0; newData.productImage = ""; newData.productSize = ""; newData.pixel = ""; newData.brightness = ""; newData.power = ""; newData.resolution = "";
                    newData.width = 0; newData.height = 0; newData.totalPanels = 0;
                    newData.ledSizeW = ""; newData.ledSizeH = ""; newData.ledResW = ""; newData.ledResH = ""; newData.totalPower = 0;
                }
                if (p) {
                    console.log('DEBUG product:', JSON.stringify(p))
                    const [sizeW, sizeH] = (p.size || '600x337.5').split('x').map(Number)
                    const [resW, resH] = (p.resolution || '480x270').split('x').map(Number)
                    const maxPower = parseFloat((p.power || '75/25').split('/')[0])
                    newData.unitPrice = p.unitPrice || 0
                    newData.productImage = p.imageUrl || ''
                    newData.productSize = p.size
                    newData.pixel = p.pixel + ' Pixel'
                    newData.brightness = p.brightness + ' Nit'
                    newData.power = p.power + ' W'
                    newData.resolution = p.resolution + ' Dpi'
                    const w = prev.width || 0, h = prev.height || 0
                    newData.totalPanels = w * h
                    newData.ledSizeW = w * sizeW
                    newData.ledSizeH = Math.round(h * sizeH)
                    newData.ledResW = w * resW
                    newData.ledResH = h * resH
                    newData.totalPower = Math.round((w * h * maxPower / 1000) * 10) / 10
                }
            }
            if (field === 'processorModel') {
                const v = vxProducts.find(vx => vx.modelName === value)
                if (!v) { newData.processorPrice = 0; newData.processorImage = '' }
                if (v) { newData.processorPrice = v.unitPrice; newData.processorImage = v.imageUrl || '' }
            }
            if (field === 'installPlace') {
                const free = ['서울', '경기', '인천']
                newData.travelCost = free.includes(value) ? 0 : 300000
            }
            if (field === 'width' || field === 'height') {
                const w = field === 'width' ? parseInt(value) || 0 : prev.width
                const h = field === 'height' ? parseInt(value) || 0 : prev.height
                const cp = products.find(pr => pr.name === prev.productName)
                const [sW, sH] = (cp?.size || '600x337.5').split('x').map(Number)
                const [rW, rH] = (cp?.resolution || '480x270').split('x').map(Number)
                const maxPower = parseFloat((cp?.power || '75/25').split('/')[0])
                newData.totalPanels = w * h
                newData.ledSizeW = w * sW
                newData.ledSizeH = Math.round(h * sH)
                newData.ledResW = w * rW
                newData.ledResH = h * rH
                newData.totalPower = Math.round((w * h * maxPower / 1000) * 10) / 10
            }
            return newData
        })
    }
    const [showModal, setShowModal] = useState(false)
    const [showQuote, setShowQuote] = useState(false)
    const fileInputRef = useRef(null)
    const businessCardRef = useRef(null)
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        const fd = new FormData()
        fd.append('file', file)
        try {
            const res = await fetch('http://localhost:8080/api/products/upload', {method: 'POST', body: fd})
            const data = await res.json()
            if (data.success) setFormData(prev => ({...prev, attachment: data.data}))
        } catch (err) { console.error('Upload failed:', err) }
    }
    const handleBusinessCard = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setFormData(prev => ({...prev, businessCard: file.name}))
        const fd = new FormData()
        fd.append('file', file)
        try {
            const res = await fetch('http://localhost:8080/api/ocr/business-card', {method: 'POST', body: fd})
            const data = await res.json()
            if (data.success && data.data) {
                const d = data.data
                setFormData(prev => ({
                    ...prev,
                    clientCompany: d.company || '',
                    clientDepartment: d.department || '',
                    clientManager: d.name || '',
                    clientPhone: d.phone || '',
                    clientMobile: d.mobile || '',
                    clientEmail: d.email || ''
                }))
            }
        } catch (err) { console.error('OCR failed:', err) }
    }
    const labelCyan = {backgroundColor: '#25CAD2'}
    const labelGreen = {backgroundColor: '#8cc63f'}
    const labelBlue = {backgroundColor: '#0071BC'}
    return (
        <div className="estimate-page">
            {showModal && <ViewModal formData={formData} onClose={() => setShowModal(false)} onQuote={() => {
                setShowModal(false);
                setShowQuote(true)
            }}/>}
            {showQuote && <QuoteModal formData={formData} products={products} vxProducts={vxProducts} onClose={() => setShowQuote(false)}/>}
            <div className="main-content-area">
                {/* ===== LEFT COLUMN ===== */}
                <div className="left-column">
                    {/* 담당자 등록 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>담당자 등록</span>
                            <button className="reset-btn">Reset</button>
                        </div>
                        <div className="section-body">
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>날짜</div>
                                <div className="form-input" style={{position: 'relative', maxWidth: '37.2%'}}>
                                    <input type="text" value={formData.date}
                                           onChange={(e) => handleChange('date', e.target.value)}
                                           style={{paddingRight: '35px'}}/>
                                    <input type="date"
                                           onChange={(e) => handleChange('date', e.target.value.replace(/-/g, '.'))}
                                           style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none'
                                    }}>
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>담당자</div>
                                    <div className="form-input">
                                        <select value={formData.manager}
                                                onChange={(e) => handleManagerSelect(e.target.value)}>
                                            {managers.map(m => (
                                                <option key={m.id} value={m.name}>{m.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>부서</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.department}
                                               onChange={(e) => handleChange('department', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>회사 연락처</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.companyPhone}
                                               onChange={(e) => handleChange('companyPhone', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>핸드폰 번호</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.mobilePhone}
                                               onChange={(e) => handleChange('mobilePhone', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>E-mail</div>
                                <div className="form-input">
                                    <input type="text" value={formData.email}
                                           onChange={(e) => handleChange('email', e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>회사 주소</div>
                                <div className="form-input">
                                    <input type="text" value={formData.companyAddress}
                                           onChange={(e) => handleChange('companyAddress', e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-row file-row">
                                <div className="form-label" style={labelCyan}>첨부파일</div>
                                <div className="form-input file-input">
                                    <input type="text" value={((formData.attachment || '').split('/').pop().replace(/^[^_]*_/, ''))} readOnly/>
                                    <button className="attach-btn" onClick={() => fileInputRef.current.click()}>첨부하기</button>
                                    <input type="file" ref={fileInputRef} style={{display:'none'}} onChange={handleFileUpload}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 업체 담당자 등록 */}
                    <div className="section-card border-green">
                        <div className="section-header green">
                            <span>업체 담당자 등록</span>
                        </div>
                        <div className="section-body">
                            <div className="form-row">
                                <div className="form-label" style={labelGreen}>기관/업체명</div>
                                <div className="form-input">
                                    <input type="text" value={formData.clientCompany} placeholder="기관/업체명 입력"
                                           onChange={(e) => handleChange('clientCompany', e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelGreen}>부서명</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.clientDepartment} placeholder="부서명 입력"
                                               onChange={(e) => handleChange('clientDepartment', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelGreen}>업체 담당자</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.clientManager} placeholder="담당자명 입력"
                                               onChange={(e) => handleChange('clientManager', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelGreen}>회사 연락처</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.clientPhone} placeholder="02-0000-0000"
                                               onChange={(e) => handleChange('clientPhone', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelGreen}>핸드폰 번호</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.clientMobile} placeholder="010-0000-0000"
                                               onChange={(e) => handleChange('clientMobile', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelGreen}>E-mail</div>
                                <div className="form-input">
                                    <input type="text" value={formData.clientEmail} placeholder="example@company.com"
                                           onChange={(e) => handleChange('clientEmail', e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-row file-row">
                                <div className="form-label" style={labelGreen}>명함 촬영</div>
                                <div className="form-input file-input">
                                    <input type="text" value={formData.businessCard} readOnly/>
                                    <button className="camera-btn" style={{backgroundColor: '#8cc63f'}} onClick={() => businessCardRef.current.click()}>사진찍기</button>
                                    <input type="file" accept="image/*" ref={businessCardRef} style={{display:'none'}} onChange={handleBusinessCard}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 설치 정보 등록 */}
                    <div className="section-card border-blue">
                        <div className="section-header blue">
                            <span>설치 정보 등록</span>
                        </div>
                        <div className="section-body">
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelBlue}>예상 설치날짜</div>
                                    <div className="form-input" style={{position: 'relative'}}>
                                        <input type="text" value={formData.installDate} placeholder="2026.01.28"
                                               onChange={(e) => handleChange('installDate', e.target.value)}
                                               style={{paddingRight: '35px'}}/>
                                        <input type="date"
                                               onChange={(e) => handleChange('installDate', e.target.value.replace(/-/g, '.'))}
                                               style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer'}}/>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelBlue}>예상 설치기간</div>
                                    <div className="form-input">
                                        <select value={formData.installPeriod}
                                                onChange={(e) => handleChange('installPeriod', e.target.value)}>
                                            {['1일', '2일', '3일', '4일', '5일', '6일', '7일'].map(v => <option
                                                key={v}>{v}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelBlue}>설치 장소</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.installLocation} placeholder="설치 장소명 입력"
                                               onChange={(e) => handleChange('installLocation', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelBlue}>세부 장소</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.installDetailLocation} placeholder="실내/실외, 층수 등"
                                               onChange={(e) => handleChange('installDetailLocation', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelBlue}>기타 내용</div>
                                <div className="form-input">
                                    <input type="text" value={formData.etcContent} placeholder="기타 전달사항 입력"
                                           onChange={(e) => handleChange('etcContent', e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="center-divider"></div>
                <div className="right-column">
                    {/* LED Display 제품 정보 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>LED Display 제품 정보</span>
                        </div>
                        <div className="section-body">
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>제품명</div>
                                <div className="split-input">
                                    <select value={formData.productName}
                                            onChange={(e) => handleChange('productName', e.target.value)}>
                                        <option value="">--선택--</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.name}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>제품 사이즈</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.productSize} readOnly/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>픽셀</div>
                                    <div className="form-input">
                                        <div style={{
                                            padding: '6px 10px',
                                            background: '#f5f5f5',
                                            borderRadius: '4px',
                                            width: '100%'
                                        }}>
                                            {formData.pixel}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>밝기</div>
                                    <div className="form-input">
                                        <input type="text" value={formData.brightness} readOnly/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>전력</div>
                                    <div className="form-input">
                                        <div style={{
                                            padding: '6px 10px',
                                            background: '#f5f5f5',
                                            borderRadius: '4px',
                                            width: '100%'
                                        }}>
                                            {formData.power}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>해상도</div>
                                <div className="split-input">
                                    <div style={{
                                        padding: '6px 10px',
                                        background: '#f5f5f5',
                                        borderRadius: '4px',
                                        width: '100%'
                                    }}>
                                        {formData.resolution}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* LED Display 구매 수량 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>LED Display 구매 수량</span>
                        </div>
                        <div className="section-body">
                            <div className="form-row quantity-row">
                                <div className="form-label" style={labelCyan}>수량</div>
                                <div className="form-input quantity-input">
                                    <span className="dim-label">W:</span>
                                    <select value={formData.width}
                                            onChange={(e) => handleChange('width', e.target.value)}>
                                        {Array.from({length: 15}, (_, i) => i + 1).map(n => <option key={n}
                                                                                                    value={n}>{n}</option>)}
                                    </select>
                                    <span className="quantity-range">1 ~ 15</span>
                                    <span className="dim-label">X H:</span>
                                    <select value={formData.height}
                                            onChange={(e) => handleChange('height', e.target.value)}>
                                        {Array.from({length: 15}, (_, i) => i + 1).map(n => <option key={n}
                                                                                                    value={n}>{n}</option>)}
                                    </select>
                                    <span className="quantity-range">1 ~ 15</span>
                                    <span className="equals">=</span>
                                    <input type="text" className="result-field" value={formData.totalPanels} readOnly/>
                                    <span className="unit">EA</span>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>LED 사이즈</div>
                                <div className="split-input">
                                    <input type="text" value={formData.ledSizeW} readOnly/>
                                    <span className="x-mark">X</span>
                                    <input type="text" value={formData.ledSizeH} readOnly/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>LED 해상도</div>
                                <div className="split-input">
                                    <input type="text" value={formData.ledResW} readOnly/>
                                    <span className="x-mark">X</span>
                                    <input type="text" value={formData.ledResH} readOnly/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={labelCyan}>전체 전력</div>
                                <div className="split-input">
                                    <input type="text" value={formData.totalPower + ' Kw'} readOnly/>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>프로세스 사양</div>
                                    <div className="form-input">
                                        <select value={formData.processorModel}
                                                onChange={(e) => handleChange('processorModel', e.target.value)}>
                                            <option value="">--선택--</option>
                                            {vxProducts.map(v => <option key={v.id} value={v.modelName}>{v.modelName}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>프로세스 수량</div>
                                    <div className="form-input">
                                        <select value={formData.processorQuantity}
                                                onChange={(e) => handleChange('processorQuantity', e.target.value)}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n}
                                                                                              value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>납품 설치 장소</div>
                                    <div className="form-input">
                                        <select value={formData.installPlace}
                                                onChange={(e) => handleChange('installPlace', e.target.value)}>
                                            <option value="">--선택--</option>
                                            <option>서울</option>
                                            <option>경기</option>
                                            <option>인천</option>
                                            <option>부산</option>
                                            <option>경남</option>
                                            <option>대구</option>
                                            <option>울산</option>
                                            <option>경북</option>
                                            <option>전북</option>
                                            <option>세종</option>
                                            <option>충남</option>
                                            <option>충북</option>
                                            <option>전남</option>
                                            <option>강원</option>
                                            <option>제주</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>지방 출장비 외</div>
                                    <div className="form-input">
                                        <input type="text" value={'₩ ' + (formData.travelCost ?? 0).toLocaleString()} 
                                               onChange={(e) => handleChange('travelCost', parseInt(e.target.value.replace(/[^\d]/g, '')) || 0)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row-group">
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>설치인원</div>
                                    <div className="form-input">
                                        <select value={formData.installPersonnel}
                                                onChange={(e) => handleChange('installPersonnel', e.target.value)}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n}
                                                                                              value={n}>{n}명</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-label" style={labelCyan}>기타 재료비 외</div>
                                    <div className="form-input">
                                        <input type="text" value={'₩ ' + (formData.materialCost ?? 0).toLocaleString()} 
                                               onChange={(e) => handleChange('materialCost', parseInt(e.target.value.replace(/[^\d]/g, '')) || 0)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* LED Display 예상도 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>LED Display 예상도</span>
                        </div>
                        <div className="section-body preview-body">
                            <div className="led-preview-border" style={{padding: '40px 20px'}}>
                                <div className="led-preview-layout">
                                    <div style={{display: 'flex', gap: '30px', alignItems: 'flex-start', justifyContent: 'center', width: '100%', paddingTop: '10px'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0'}}>
                                            <div className="led-preview-line-v-top"></div>
                                            <div className="led-preview-label-v">{formData.ledSizeH}mm</div>
                                            <div className="led-preview-line-v-bottom"></div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center'}}>
                                            <div className="led-grid" style={{
                                                gridTemplateColumns: `repeat(${formData.width}, 1fr)`,
                                                gridTemplateRows: `repeat(${formData.height}, 1fr)`,
                                                width: '600px',
                                                height: '350px',
                                                display: 'grid',
                                                gap: '2px'
                                            }}>
                                                {Array.from({length: formData.totalPanels}).map((_, i) => (
                                                    <div key={i} className="led-panel"></div>
                                                ))}
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '0', width: '600px'}}>
                                                <div className="led-preview-line-h-left"></div>
                                                <div className="led-preview-label-h">{formData.ledSizeW}mm</div>
                                                <div className="led-preview-line-h-right"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-actions">
                <button className="btn-view-saved" onClick={() => setShowModal(true)}>전체 내용 보기</button>
                <button className="btn-view-quote" onClick={() => { if (!formData.productName) return alert('제품명을 선택해주세요'); if (!formData.processorModel) return alert('프로세서 사양을 선택해주세요'); if (!formData.installPlace) return alert('납품 설치 장소를 선택해주세요'); setShowQuote(true) }}>견적서 보기</button>
            </div>
        </div>
    )
}
export default EstimateForm
