import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './AdminPage.css'
import './EstimateForm.css'
import modalLogoImg from '../assets/modal-logo2.png'
import modalLogoImg1 from '../assets/modal-logo.png'
import printIconImg from '../assets/print-icon.png'
import stampImg from '../assets/stamp.png'
import { QuoteModal } from './EstimateForm'

const API_BASE = import.meta.env.VITE_API_URL + '/api'


function ViewModal({formData, onClose, onQuote}) {
    const maxGridW = 450
    const maxGridH = 250
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
                                            <div style={{position:'relative'}}>
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
                                                <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'visible'}}>
                                                    <defs><marker id="ahView" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3BC1CC"/></marker><marker id="ahViewR" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="8 0, 0 3, 8 6" fill="#3BC1CC"/></marker></defs>
                                                    <line x1="2%" y1="98%" x2="98%" y2="2%" stroke="#3BC1CC" strokeWidth="3" markerStart="url(#ahViewR)" markerEnd="url(#ahView)"/>
                                                </svg>
                                                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'#3BC1CC',borderRadius:'4px',padding:'4px 12px',whiteSpace:'nowrap'}}>
                                                    <span style={{color:'white',fontWeight:'bold',fontSize:'18px'}}>{Math.round(Math.sqrt(Math.pow(Number(formData.ledSizeW)||0,2)+Math.pow(Number(formData.ledSizeH)||0,2))/25.4)}"</span>
                                                </div>
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

  const toFormData = (est) => {
    if (!est?.raw) return defaultFormData
    const e = est.raw
    const p = products.find(pr => pr.name === e.productName)
    const vx = vxProducts.find(v => v.modelName === e.processorModel)
    const [sW, sH] = (e.ledSize || '0x0').split('x').map(Number)
    return {
      date: e.date?.replace(/-/g, '.') || '',
      managerName: e.managerName || '', manager: e.managerName || '', department: e.department || '',
      companyPhone: e.companyPhone || '', mobilePhone: e.mobilePhone || '',
      email: e.email || '', companyAddress: e.companyAddress || '',
      attachment: e.attachmentFile || '',
      clientCompany: e.clientCompanyName || '', clientDepartment: e.clientDepartment || '',
      clientManager: e.clientManager || '', clientPhone: e.clientPhone || '',
      clientMobile: e.clientMobile || '', clientEmail: e.clientEmail || '',
      businessCard: e.businessCardImage || '',
      installDate: e.installDate?.replace(/-/g, '.') || '',
      installPeriod: e.installPeriod || '', installLocation: e.installLocation || '',
      installDetailLocation: e.installDetailLocation || '', etcContent: e.etcContent || '',
      productName: e.productName || '',
      productSize: p?.size || '', pixel: (p?.pixel || '') + ' Pixel',
      brightness: (p?.brightness || '') + ' Nit', power: (p?.power || '') + ' W',
      resolution: (p?.resolution || '') + ' Dpi',
      unitPrice: p?.unitPrice || 0,
      width: e.width || 0, height: e.height || 0, totalPanels: e.quantity || 0,
      ledSizeW: sW, ledSizeH: sH,
      totalPower: e.totalPower || 0, installPersonnel: e.installPersonnel || 0,
      processorModel: e.processorModel || '', processorQuantity: e.processorQuantity || 1,
      processorPrice: vx?.unitPrice || e.processorPrice || 0,
      laborPrice: laborCost || 300000,
      installPlace: e.installLocation || '',
      materialCost: e.etcPrice || 0, travelCost: e.travelCost || 0,
      _ledPrice: e.ledPrice || 0, _processorPrice: e.processorPrice || 0,
      _installPrice: e.installPrice || 0, _totalPrice: e.totalPrice || 0
    }
  }
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

  const [managers, setManagers] = useState([])
  const [managerForm, setManagerForm] = useState({ name: '', department: '', phone: '', mobile: '', email: '', address: '', businessCardImage: null, emailSubject: '', emailBody: '' })
  const [showManagerModal, setShowManagerModal] = useState(false)
  const [editingManagerId, setEditingManagerId] = useState(null)
  const [managerImageFile, setManagerImageFile] = useState(null)
  const [managerAttachFile, setManagerAttachFile] = useState(null)

  const [settingsForm, setSettingsForm] = useState({
    companyName: '', companyAddress: '', companyPhone: '', companyEmail: '',
    quoteValidity: '', paymentTerms: '', warrantyPeriod: '',
    smtpServer: '', smtpPort: '', emailAccount: '', emailPassword: '', defaultAttachment: ''
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
          emailPassword: d.emailPassword || '',
          defaultAttachment: d.defaultAttachment || prev.defaultAttachment
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

  const fetchManagers = async () => {
    try {
      const res = await fetch(`${API_BASE}/managers`)
      const data = await res.json()
      if (data.success) setManagers(data.data)
    } catch (e) { console.error('Failed to fetch managers:', e) }
  }

  useEffect(() => {
    fetchProducts()
    fetchVxProducts()
    fetchEstimates()
    fetchSettings()
    fetchAccounts()
    fetchManagers()
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
          request: e,
          amount: e.totalPrice || 0,
          status: '완료',
          raw: e
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
              <th>날짜</th>
              <th>고객명</th>
              <th>담당자</th>
              <th>의뢰명</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {[...estimates].sort((a, b) => b.id - a.id).slice(0, 5).map(est => (
              <tr key={est.id}>
                <td>{est.date}</td>
                <td>{est.customer}</td>
                <td>{est.manager}</td>
                <td>{est.request?.productName || ''}</td>
                <td>₩ {(est.amount || 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
  }

  const [selectedEstIds, setSelectedEstIds] = useState([])
  const [estSearchText, setEstSearchText] = useState('')
  const [estDateFrom, setEstDateFrom] = useState('')
  const [estDateTo, setEstDateTo] = useState('')
  const filteredEstimates = estimates.filter(est => {
    if (!estSearchText.trim() && !estDateFrom && !estDateTo) return true
    const q = estSearchText.trim().toLowerCase()
    const nameMatch = !q || (est.manager || '').toLowerCase().includes(q) || (est.clientManager || '').toLowerCase().includes(q) || (est.customer || '').toLowerCase().includes(q)
    const dateMatch = (!estDateFrom || est.date >= estDateFrom) && (!estDateTo || est.date <= estDateTo)
    return nameMatch && dateMatch
  })
  const toggleEstId = (id) => setSelectedEstIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleAllEst = () => setSelectedEstIds(prev => prev.length === filteredEstimates.length ? [] : filteredEstimates.map(e => e.id))
  const deleteSelectedEstimates = async () => {
    if (selectedEstIds.length === 0) return alert('선택된 항목이 없습니다.')
    if (!window.confirm(`${selectedEstIds.length}건을 삭제하시겠습니까?`)) return
    try {
      await Promise.all(selectedEstIds.map(id => fetch(`${API_BASE}/estimates/${id}`, { method: 'DELETE' })))
      setSelectedEstIds([])
      fetchEstimates()
    } catch (e) { console.error('Failed to delete estimates:', e) }
  }

  const [estPage, setEstPage] = useState(1)
  const estPerPage = 10
  const sortedEstimates = [...filteredEstimates].sort((a, b) => b.id - a.id)
  const estTotalPages = Math.max(1, Math.ceil(sortedEstimates.length / estPerPage))
  const pagedEstimates = sortedEstimates.slice((estPage - 1) * estPerPage, estPage * estPerPage)

  const renderEstimates = () => (
    <div className="admin-section">
      <h2>등록 자료 보기</h2>
      <div className="search-bar" style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
        <input type="date" value={estDateFrom} onChange={e => { setEstDateFrom(e.target.value); setEstPage(1) }} style={{padding:'6px 10px',border:'1px solid #ddd',borderRadius:'4px',fontFamily:"'Malgun Gothic','맑은 고딕',sans-serif",width:'130px',flex:'none'}} />
        <span>~</span>
        <input type="date" value={estDateTo} onChange={e => { setEstDateTo(e.target.value); setEstPage(1) }} style={{padding:'6px 10px',border:'1px solid #ddd',borderRadius:'4px',fontFamily:"'Malgun Gothic','맑은 고딕',sans-serif",width:'130px',flex:'none'}} />
        <input type="text" placeholder="이지텍 담당자 / 업체 담당자 / 업체명 검색" value={estSearchText} onChange={e => { setEstSearchText(e.target.value); setEstPage(1) }} />
        <button className="btn-cyan" onClick={() => setEstSearchText(estSearchText)}>검색</button>
        <button style={{background:'#dc3545',color:'white',border:'none',borderRadius:'4px',padding:'10px 20px',fontSize:'14px',fontWeight:500,cursor:'pointer',marginLeft:'8px'}} onClick={deleteSelectedEstimates}>선택 삭제 ({selectedEstIds.length})</button>
        <button style={{background:'#333',color:'white',border:'none',borderRadius:'4px',padding:'10px 20px',fontSize:'14px',fontWeight:500,cursor:'pointer',marginLeft:'4px'}} onClick={async()=>{if(!estimates.length)return alert('삭제할 항목이 없습니다.');if(!window.confirm(`전체 ${estimates.length}건을 삭제하시겠습니까?`))return;try{await Promise.all(estimates.map(e=>fetch(`${API_BASE}/estimates/${e.id}`,{method:'DELETE'})));setSelectedEstIds([]);setEstPage(1);fetchEstimates()}catch(e){console.error(e)}}}>전체 삭제 ({estimates.length})</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectedEstIds.length === pagedEstimates.length && pagedEstimates.length > 0} onChange={() => setSelectedEstIds(prev => prev.length === pagedEstimates.length ? [] : pagedEstimates.map(e => e.id))} /></th>
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
          {pagedEstimates.map(est => (
            <tr key={est.id}>
              <td><input type="checkbox" checked={selectedEstIds.includes(est.id)} onChange={() => toggleEstId(est.id)} /></td>
              <td>{est.date}</td>
              <td>{est.manager}</td>
              <td>{est.customer}</td>
              <td>{est.clientManager}</td>
              <td>{est.phone}</td>
              <td>{est.email}</td>
              <td>{(() => { const e = est.request; const p = products.find(pr => pr.name === e.productName); return `${e.productName} / ${p ? p.pixel + 'Pixel' : ''} / ${e.width}x${e.height}(${e.quantity}ea)`; })()}</td>
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
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'8px',marginTop:'16px'}}>
        <button disabled={estPage<=1} onClick={()=>setEstPage(1)} style={{padding:'4px 10px',border:'1px solid #ddd',borderRadius:'4px',cursor:'pointer'}}>«</button>
        <button disabled={estPage<=1} onClick={()=>setEstPage(p=>p-1)} style={{padding:'4px 10px',border:'1px solid #ddd',borderRadius:'4px',cursor:'pointer'}}>‹</button>
        <span style={{fontSize:'14px'}}>{estPage} / {estTotalPages} ({sortedEstimates.length}건)</span>
        <button disabled={estPage>=estTotalPages} onClick={()=>setEstPage(p=>p+1)} style={{padding:'4px 10px',border:'1px solid #ddd',borderRadius:'4px',cursor:'pointer'}}>›</button>
        <button disabled={estPage>=estTotalPages} onClick={()=>setEstPage(estTotalPages)} style={{padding:'4px 10px',border:'1px solid #ddd',borderRadius:'4px',cursor:'pointer'}}>»</button>
      </div>
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
                <td>{prod.imageUrl ? <img src={`${import.meta.env.VITE_API_URL}${prod.imageUrl}`} alt={prod.name} style={{width: '130px', height: '130px', objectFit: 'contain', borderRadius: '4px'}} /> : '-'}</td>
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
                <td>{vx.imageUrl ? <img src={`${import.meta.env.VITE_API_URL}${vx.imageUrl}`} alt={vx.model} style={{width: '130px', height: '130px', objectFit: 'contain', borderRadius: '4px'}} /> : '-'}</td>
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

  const renderManagers = () => {
    const handleSaveManager = async () => {
      const phoneRegex = /^[\d]{2,4}-[\d]{3,4}-[\d]{4}$/
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!managerForm.name?.trim()) return alert('이름을 입력하세요')
      if (!managerForm.mobile?.trim()) return alert('핸드폰 번호를 입력하세요')
      if (!phoneRegex.test(managerForm.mobile)) return alert('핸드폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)')
      if (managerForm.phone?.trim() && !phoneRegex.test(managerForm.phone)) return alert('회사 연락처 형식이 올바르지 않습니다. (예: 02-6258-1600)')
      if (!managerForm.email?.trim()) return alert('이메일을 입력하세요')
      if (!emailRegex.test(managerForm.email)) return alert('이메일 형식이 올바르지 않습니다.')
      try {
        const formData = new FormData()
        formData.append('name', managerForm.name)
        formData.append('department', managerForm.department || '')
        formData.append('phone', managerForm.phone || '')
        formData.append('mobile', managerForm.mobile)
        formData.append('email', managerForm.email)
        formData.append('address', managerForm.address || '')
        formData.append('emailSubject', managerForm.emailSubject || '')
        formData.append('emailBody', managerForm.emailBody || '')
        if (managerForm.smtpServer) formData.append('smtpServer', managerForm.smtpServer)
        if (managerForm.smtpPort) formData.append('smtpPort', managerForm.smtpPort)
        if (managerForm.smtpAccount) formData.append('smtpAccount', managerForm.smtpAccount)
        if (managerForm.smtpPassword) formData.append('smtpPassword', managerForm.smtpPassword)
        if (managerImageFile) {
          formData.append('businessCardImage', managerImageFile)
        }
        if (managerAttachFile) {
          formData.append('attachmentFile', managerAttachFile)
        }

        if (editingManagerId) {
          await fetch(`${API_BASE}/managers/${editingManagerId}/with-image`, {
            method: 'PUT',
            body: formData
          })
        } else {
          await fetch(`${API_BASE}/managers/with-image`, {
            method: 'POST',
            body: formData
          })
        }
        fetchManagers()
        setManagerForm({ name: '', department: '', phone: '', mobile: '', email: '', address: '', businessCardImage: null, attachmentFile: '', emailSubject: '', emailBody: '' })
        setManagerImageFile(null)
        setManagerAttachFile(null)
        setEditingManagerId(null)
        setShowManagerModal(false)
      } catch (e) { console.error('Failed to save manager:', e) }
    }

    const handleDeleteManager = async (id) => {
      if (!confirm('정말 삭제하시겠습니까?')) return
      try {
        await fetch(`${API_BASE}/managers/${id}`, { method: 'DELETE' })
        fetchManagers()
      } catch (e) { console.error('Failed to delete manager:', e) }
    }

    return (
      <div className="admin-section">
        <h2>담당자 관리</h2>
        <div className="section-title-bar">
          <h3>이지텍 담당자 목록</h3>
          <button className="btn-cyan" onClick={() => {
            setManagerForm({ name: '', department: '', phone: '', mobile: '', email: '', address: '', businessCardImage: null, emailSubject: '', emailBody: '' })
            setManagerImageFile(null)
            setEditingManagerId(null)
            setShowManagerModal(true)
          }}>담당자 추가</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>순번</th>
              <th>이름</th>
              <th>부서</th>
              <th>회사 연락처</th>
              <th>핸드폰</th>
              <th>이메일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td>{m.name}</td>
                <td>{m.department}</td>
                <td>{m.phone}</td>
                <td>{m.mobile}</td>
                <td>{m.email}</td>
                <td>
                  <button className="btn-small btn-cyan" onClick={() => {
                    setManagerForm({ name: m.name, department: m.department, phone: m.phone, mobile: m.mobile, email: m.email, address: m.address, businessCardImage: m.businessCardImage, attachmentFile: m.attachmentFile || '', emailSubject: m.emailSubject || '', emailBody: m.emailBody || '', smtpServer: m.smtpServer || '', smtpPort: m.smtpPort || '', smtpAccount: m.smtpAccount || m.email || '', smtpPassword: m.smtpPassword || '' })
                    setManagerImageFile(null)
                    setManagerAttachFile(null)
                    setEditingManagerId(m.id)
                    setShowManagerModal(true)
                  }}>수정</button>
                  <button className="btn-small btn-danger" onClick={() => handleDeleteManager(m.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showManagerModal && (
          <div className="modal-overlay" onClick={() => setShowManagerModal(false)}>
            <div className="product-register-modal" onClick={e => e.stopPropagation()}>
              <h2 className="register-title">{editingManagerId ? '담당자 수정' : '담당자 추가'}</h2>
              <form className="register-form" onSubmit={e => { e.preventDefault(); handleSaveManager() }}>
                <div className="register-row">
                  <div className="register-label">이름</div>
                  <input type="text" className="register-input" placeholder="홍길동" value={managerForm.name} onChange={e => setManagerForm({...managerForm, name: e.target.value})} />
                  <div className="register-label">부서</div>
                  <input type="text" className="register-input" placeholder="기획팀" value={managerForm.department} onChange={e => setManagerForm({...managerForm, department: e.target.value})} />
                </div>
                <div className="register-row">
                  <div className="register-label">회사 연락처</div>
                  <input type="text" className="register-input" placeholder="02-6258-1600" value={managerForm.phone} onChange={e => setManagerForm({...managerForm, phone: e.target.value})} />
                  <div className="register-label">핸드폰</div>
                  <input type="text" className="register-input" placeholder="010-1234-5678" value={managerForm.mobile} onChange={e => setManagerForm({...managerForm, mobile: e.target.value})} />
                </div>
                <div className="register-row-full">
                  <div className="register-label">이메일</div>
                  <input type="text" className="register-input-full" placeholder="example@iztec.co.kr" value={managerForm.email} onChange={e => setManagerForm({...managerForm, email: e.target.value})} />
                </div>
                <div className="register-row-full">
                  <div className="register-label">회사 주소</div>
                  <input type="text" className="register-input-full" placeholder="경기도 남양주시 화도읍 재재기로 190번길 32" value={managerForm.address} onChange={e => setManagerForm({...managerForm, address: e.target.value})} />
                </div>
                <div className="register-row-full">
                  <div className="register-label">명함 이미지</div>
                  <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <input type="file" accept="image/*" onChange={e => setManagerImageFile(e.target.files[0])} />
                    {managerForm.businessCardImage && !managerImageFile && (
                      <img src={`${import.meta.env.VITE_API_URL}${managerForm.businessCardImage}`} alt="명함" style={{maxWidth: '200px', maxHeight: '150px'}} />
                    )}
                  </div>
                </div>
                <div className="register-row-full">
                  <div className="register-label">메일 제목</div>
                  <input type="text" className="register-input-full" placeholder="견적서 발송 드립니다" value={managerForm.emailSubject} onChange={e => setManagerForm({...managerForm, emailSubject: e.target.value})} />
                </div>
                <div className="register-row-full">
                  <div className="register-label">메일 내용</div>
                  <textarea className="register-input-full" placeholder="안녕하세요. LED 견적서를 보내드립니다." value={managerForm.emailBody} onChange={e => setManagerForm({...managerForm, emailBody: e.target.value})} style={{minHeight: '100px', resize: 'vertical', padding: '10px'}} />
                </div>
                <div className="register-row-full">
                  <div className="register-label">추가 첨부파일</div>
                  <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <input type="file" onChange={e => setManagerAttachFile(e.target.files[0])} />
                    {managerForm.attachmentFile && !managerAttachFile && (
                      <span style={{fontSize:'13px',color:'#666'}}>현재: {managerForm.attachmentFile.split('/').pop().replace(/^[^_]*_/,'')}</span>
                    )}
                  </div>
                </div>
                <div className="register-row-full" style={{borderTop:'2px solid #4ECDC4',paddingTop:'15px',marginTop:'15px'}}>
                  <div style={{fontSize:'18px',fontWeight:'bold',color:'#333',marginBottom:'10px'}}>SMTP 설정</div>
                </div>
                <div className="register-row">
                  <div className="register-label">SMTP 서버</div>
                  <input type="text" className="register-input" placeholder="smtp.gmail.com" value={managerForm.smtpServer||''} onChange={e => setManagerForm({...managerForm, smtpServer: e.target.value})} />
                  <div className="register-label">포트</div>
                  <input type="text" className="register-input" placeholder="587" value={managerForm.smtpPort||''} onChange={e => setManagerForm({...managerForm, smtpPort: e.target.value})} />
                </div>
                <div className="register-row">
                  <div className="register-label">메일 계정</div>
                  <input type="text" className="register-input" placeholder="user@gmail.com" value={managerForm.smtpAccount||''} onChange={e => setManagerForm({...managerForm, smtpAccount: e.target.value})} />
                  <div className="register-label">비밀번호</div>
                  <input type="password" className="register-input" placeholder="앱 비밀번호" value={managerForm.smtpPassword||''} onChange={e => setManagerForm({...managerForm, smtpPassword: e.target.value})} />
                </div>
                <div className="register-buttons">
                  <button type="button" className="register-btn-cancel" onClick={() => setShowManagerModal(false)}>취소</button>
                  <button type="submit" className="register-btn-submit">{editingManagerId ? '수정완료' : '등록'}</button>
                </div>
              </form>
            </div>
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
          formData={toFormData(selectedEstimate)} 
          onClose={() => setShowViewModal(false)}
          onQuote={() => {
            setShowViewModal(false)
            setShowQuoteModal(true)
          }}
        />
      )}

      {showQuoteModal && selectedEstimate && (
        <QuoteModal 
          formData={toFormData(selectedEstimate)}
          products={products}
          vxProducts={vxProducts}
          managers={managers}
          readOnly
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
            className={activeTab === 'managers' ? 'active' : ''}
            onClick={() => setActiveTab('managers')}
          >
            담당자 관리
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
          {activeTab === 'managers' && renderManagers()}
          {activeTab === 'accounts' && renderAccounts()}
        </div>
      </main>
    </div>
  )
}

export default AdminPage
