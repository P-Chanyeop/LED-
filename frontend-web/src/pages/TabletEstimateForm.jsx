import { useState, useEffect, useRef } from 'react'
import './TabletEstimateForm.css'
import modalLogoImg from '../assets/modal-logo2.png'
import easytechLogo from '../assets/easytech-logo.png'
import stampImg from '../assets/stamp.png'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const REGIONS = ['서울','경기','인천','부산','경남','대구','울산','경북','대전','세종','충남','충북','전북','광주','전남','강원','제주']
const FREE_REGIONS = ['서울','경기','인천']

function TabletEstimateForm() {
    useEffect(() => { document.title = 'LED 자동견적 시스템 - 태블릿' }, [])
    const [step, setStep] = useState(1)
    const [showQuote, setShowQuote] = useState(false)
    const [managerList, setManagerList] = useState([])
    const [showManagerDropdown, setShowManagerDropdown] = useState(false)
    const [attachmentFile, setAttachmentFile] = useState([])
    const [showPhotoOptions, setShowPhotoOptions] = useState(false)
    const [isSendingEmail, setIsSendingEmail] = useState(false)
    const viewContentRef = useRef(null)
    const [products, setProducts] = useState([])
    const [vxProducts, setVxProducts] = useState([])
    const initialFormData = {
        date: new Date().toISOString().split('T')[0],
        managerName: '', department: '', managerPhone: '', managerMobile: '',
        managerEmail: '', companyAddress: '', attachment: '',
        clientName: '', clientDepartment: '', clientManager: '',
        clientPhone: '', clientMobile: '', clientEmail: '', businessCard: '',
        installDate: new Date().toISOString().split('T')[0], installPeriod: '1일', installLocation: '', installDetail: '', installNote: '',
        productName: '', productSize: '', pixel: '',
        brightness: '', power: '', resolution: '',
        ledWidth: 1, ledHeight: 1, ledSizeW: 0, ledSizeH: 0,
        ledResolutionW: 0, ledResolutionH: 0, totalPower: 0,
        processorModel: '', processorQuantity: 1, totalPanels: 0,
        installWorkers: 1,
        deliveryLocation: '',
        regionalTravelCost: 0,
        materialCost: 0,
    }
    const [formData, setFormData] = useState(initialFormData)

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/api/managers')
            .then(res => res.json())
            .then(response => {
                if (response.success && response.data) {
                    setManagerList(response.data)
                }
            })
            .catch(err => console.error('담당자 목록 로드 실패:', err))
        fetch(import.meta.env.VITE_API_URL + '/api/products/led')
            .then(r => r.json())
            .then(data => { if (data.success && data.data.length > 0) setProducts(data.data) })
            .catch(e => console.error('Failed to fetch products:', e))
        fetch(import.meta.env.VITE_API_URL + '/api/products/vx')
            .then(r => r.json())
            .then(data => { if (data.success && data.data.length > 0) setVxProducts(data.data) })
            .catch(e => console.error('Failed to fetch vx products:', e))
        fetch(import.meta.env.VITE_API_URL + '/api/settings')
            .then(r => r.json())
            .then(data => {})
            .catch(e => console.error('Failed to fetch settings:', e))
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showManagerDropdown && !e.target.closest('.tb-inp--dropdown')) {
                setShowManagerDropdown(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showManagerDropdown])

    const selectManager = (manager) => {
        setFormData(prev => ({
            ...prev,
            managerName: manager.name,
            department: manager.department,
            managerPhone: manager.phone,
            managerMobile: manager.mobile,
            managerEmail: manager.email,
            companyAddress: manager.address
        }))
        setShowManagerDropdown(false)
    }

    const handleAttachmentClick = () => {
        document.getElementById('attachment-input').click()
    }

    const handleAttachmentChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length > 5) { alert('첨부파일은 최대 5개까지 가능합니다.'); e.target.value = ''; return }
        if (files.length) {
            setAttachmentFile(files)
            h('attachment', files.map(f => f.name).join(', '))
        }
        e.target.value = ''
    }

    const handlePhotoClick = () => {
        setShowPhotoOptions(true)
    }

    const handleCameraCapture = () => {
        document.getElementById('camera-input').click()
        setShowPhotoOptions(false)
    }

    const handleGallerySelect = () => {
        document.getElementById('gallery-input').click()
        setShowPhotoOptions(false)
    }

    const handleBusinessCardChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            h('businessCard', file.name)
            
            // OCR 처리
            const formData = new FormData()
            formData.append('file', file)
            
            try {
                console.log('OCR 요청 시작...')
                const response = await fetch(import.meta.env.VITE_API_URL + '/api/ocr/business-card', {
                    method: 'POST',
                    body: formData
                })
                const result = await response.json()
                console.log('OCR 결과:', result)
                
                if (result.success && result.data) {
                    const data = result.data
                    console.log('인식된 데이터:', data)
                    setFormData(prev => ({
                        ...prev,
                        clientName: data.company || prev.clientName,
                        clientManager: data.name || prev.clientManager,
                        clientDepartment: data.department || prev.clientDepartment,
                        clientPhone: data.phone || prev.clientPhone,
                        clientMobile: data.mobile || prev.clientMobile,
                        clientEmail: data.email || prev.clientEmail
                    }))
                    alert('명함 정보가 입력되었습니다!')
                } else {
                    alert('명함 인식 실패: ' + (result.message || '알 수 없는 오류'))
                }
            } catch (err) {
                console.error('명함 인식 실패:', err)
                alert('명함 인식 중 오류가 발생했습니다.')
            }
        }
    }

    const h = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value }
            if (field === 'productName') {
                const p = products.find(pr => pr.name === value)
                if (!p) {
                    updated.productSize = ''; updated.pixel = ''; updated.brightness = ''; updated.power = ''; updated.resolution = ''
                } else {
                    const [sW, sH] = (p.size || '600x337.5').split('x').map(Number)
                    const [rW, rH] = (p.resolution || '480x270').split('x').map(Number)
                    const maxPower = parseFloat((p.power || '75/25').split('/')[0])
                    updated.productSize = p.size
                    updated.pixel = p.pixel + ' Pixel'
                    updated.brightness = p.brightness + ' Nit'
                    updated.power = p.power + ' W'
                    updated.resolution = p.resolution + ' Dpi'
                    updated.ledSizeW = prev.ledWidth * sW
                    updated.ledSizeH = Math.round(prev.ledHeight * sH)
                    updated.ledResolutionW = prev.ledWidth * rW
                    updated.ledResolutionH = prev.ledHeight * rH
                    updated.totalPower = (maxPower * prev.ledWidth * prev.ledHeight / 1000).toFixed(1) + ' Kw'
                }
            }
            if (field === 'processorModel') {
                const v = vxProducts.find(vx => vx.modelName === value)
                if (v) updated.processorPrice = v.unitPrice
            }
            if (field === 'ledWidth' || field === 'ledHeight') {
                const w = field === 'ledWidth' ? value : prev.ledWidth
                const ht = field === 'ledWidth' ? value : (field === 'ledHeight' ? value : prev.ledHeight)
                const cp = products.find(pr => pr.name === prev.productName)
                const [sW, sH] = (cp?.size || '600x337.5').split('x').map(Number)
                const [rW, rH] = (cp?.resolution || '480x270').split('x').map(Number)
                const maxPower = parseFloat((cp?.power || '75/25').split('/')[0])
                updated.totalPanels = w * ht
                if (field === 'ledWidth') updated.ledHeight = value
                updated.ledSizeW = w * sW
                updated.ledSizeH = Math.round(ht * sH)
                updated.ledResolutionW = w * rW
                updated.ledResolutionH = ht * rH
                updated.totalPower = (maxPower * w * ht / 1000).toFixed(1) + ' Kw'
            }
            return updated
        })
    }
    const nextStep = () => { 
        if (step < 3) {
            setStep(step + 1)
            window.scrollTo(0, 0)
        }
    }
    const prevStep = () => { 
        if (step > 1) {
            setStep(step - 1)
            window.scrollTo(0, 0)
        }
    }
    const handleRegionChange = (region) => {
        h('deliveryLocation', region)
        if (FREE_REGIONS.includes(region)) {
            h('regionalTravelCost', 0)
        } else {
            h('regionalTravelCost', 300000)
        }
    }

    const currentProduct = products.find(p => p.name === formData.productName)
    const currentVx = vxProducts.find(v => v.modelName === formData.processorModel)
    const productImageUrl = currentProduct?.imageUrl && currentProduct.imageUrl.trim() ? `${import.meta.env.VITE_API_URL}${currentProduct.imageUrl}` : null
    const processorImageUrl = currentVx?.imageUrl && currentVx.imageUrl.trim() ? `${import.meta.env.VITE_API_URL}${currentVx.imageUrl}` : null

    const panelPrice = currentProduct?.unitPrice || 950000
    const processorPrice = formData.processorModel ? (currentVx?.unitPrice || 3000000) : 0
    const workerPrice = 300000
    const ledSqm = Math.round((formData.ledSizeW * formData.ledSizeH) / 1000000 * 100) / 100
    const panelSqm = formData.productSize ? formData.productSize.split('x').map(Number).reduce((a,b) => a * b) / 1000000 : 0
    const sqmPrice = panelSqm > 0 ? Math.round(Math.floor(1 / panelSqm * 100000) / 100000 * panelPrice) : 0
    const ledTotal = panelPrice * formData.totalPanels
    const processorTotal = processorPrice * formData.processorQuantity
    const laborTotal = workerPrice * formData.installWorkers
    const materialTotal = formData.materialCost
    const travelTotal = formData.regionalTravelCost
    const salesTotal = ledTotal + processorTotal
    const addTotal = laborTotal + materialTotal + travelTotal
    const grandTotal = salesTotal + addTotal
    const fmt = (n) => n.toLocaleString()
    const savedRef = useRef(false)
    useEffect(() => {
        if (!showQuote) return
        if (savedRef.current) return
        savedRef.current = true
        console.log('견적 저장 시도:', formData.productName, formData.clientName)
        fetch(import.meta.env.VITE_API_URL + '/api/estimates', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date:formData.date,managerName:formData.managerName,department:formData.department,companyPhone:formData.managerPhone,mobilePhone:formData.managerMobile,email:formData.managerEmail,companyAddress:formData.companyAddress,clientCompanyName:formData.clientName,clientDepartment:formData.clientDepartment,clientManager:formData.clientManager,clientPhone:formData.clientPhone,clientMobile:formData.clientMobile,clientEmail:formData.clientEmail,installDate:formData.installDate,installPeriod:formData.installPeriod,installLocation:formData.deliveryLocation,installDetailLocation:formData.installDetail,etcContent:formData.installNote,productName:formData.productName,width:formData.ledWidth,height:formData.ledHeight,quantity:formData.totalPanels,ledSize:(formData.ledSizeW||0)+'x'+(formData.ledSizeH||0),ledResolution:formData.resolution||'',totalPower:parseFloat(formData.totalPower)||0,installPersonnel:formData.installWorkers,processorModel:formData.processorModel,processorQuantity:formData.processorQuantity,ledPrice:salesTotal,processorPrice:processorTotal,installPrice:laborTotal,etcPrice:materialTotal,travelCost:travelTotal,totalPrice:grandTotal})})
        .then(r => r.json()).then(d => console.log('견적 저장 결과:', d))
        .catch(e=>console.error('견적 저장 실패:', e))
    }, [showQuote])

    return (
        <div className="tb-container">
            {step === 1 && (
                <div className="tb-step">
                    <div className="tb-header"><img src={modalLogoImg} alt="logo" /></div>

                    <div className="tb-section">
                        <div className="tb-sh">
                            <span>담당자 등록</span>
                            <button className="tb-btn-reset" onClick={() => setFormData({...initialFormData, date: new Date().toISOString().split('T')[0]})}>Reset</button>
                        </div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl">날짜</div>
                                <div className="tb-inp" style={{flex:'none',width:'30vw'}}><input type="date" value={formData.date} onChange={e=>h('date',e.target.value)} /></div>
                                <div style={{flex:1}}></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">담당자</div>
                                <div className="tb-inp">
                                    <select 
                                        value={formData.managerName}
                                        onChange={e => {
                                            const manager = managerList.find(m => m.name === e.target.value)
                                            if (manager) selectManager(manager)
                                        }}
                                    >
                                        <option value="">선택</option>
                                        {managerList.map((manager, idx) => (
                                            <option key={idx} value={manager.name}>{manager.name} ({manager.department})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="tb-lbl">부서</div>
                                <div className="tb-inp"><input type="text" value={formData.department} onChange={e=>h('department',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">회사 연락처</div>
                                <div className="tb-inp"><input type="text" value={formData.managerPhone} onChange={e=>h('managerPhone',e.target.value)} /></div>
                                <div className="tb-lbl">핸드폰 번호</div>
                                <div className="tb-inp"><input type="text" value={formData.managerMobile} onChange={e=>h('managerMobile',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">E-mail</div>
                                <div className="tb-inp" style={{flex:3}}><input type="email" value={formData.managerEmail} onChange={e=>h('managerEmail',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">회사 주소</div>
                                <div className="tb-inp" style={{flex:3}}><input type="text" value={formData.companyAddress} onChange={e=>h('companyAddress',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">첨부파일</div>
                                <div className="tb-inp" style={{flex:2,overflow:'hidden'}}>
                                    <input type="text" value={(formData.attachment || '')} readOnly placeholder="파일을 선택하세요" style={{textOverflow:'ellipsis'}} />
                                </div>
                                <input 
                                    type="file" 
                                    id="attachment-input" 
                                    style={{display: 'none'}}
                                    onChange={handleAttachmentChange}
                                    multiple
                                />
                                <button className="tb-btn-action" onClick={handleAttachmentClick}>첨부하기</button>
                            </div>
                        </div>
                    </div>

                    <div className="tb-section tb-section--green">
                        <div className="tb-sh tb-sh--green"><span>업체 담당자 등록</span></div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--green">기관/업체명</div>
                                <div className="tb-inp" style={{flex:3}}><input type="text" value={formData.clientName} onChange={e=>h('clientName',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--green">부서명</div>
                                <div className="tb-inp"><input type="text" value={formData.clientDepartment} onChange={e=>h('clientDepartment',e.target.value)} /></div>
                                <div className="tb-lbl tb-lbl--green">업체 담당자</div>
                                <div className="tb-inp"><input type="text" value={formData.clientManager} onChange={e=>h('clientManager',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--green">회사 연락처</div>
                                <div className="tb-inp"><input type="text" value={formData.clientPhone} onChange={e=>h('clientPhone',e.target.value)} /></div>
                                <div className="tb-lbl tb-lbl--green">핸드폰 번호</div>
                                <div className="tb-inp"><input type="text" value={formData.clientMobile} onChange={e=>h('clientMobile',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--green">E-mail</div>
                                <div className="tb-inp" style={{flex:3}}><input type="email" value={formData.clientEmail} onChange={e=>h('clientEmail',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--green">명함 촬영</div>
                                <div className="tb-inp" style={{flex:2}}>
                                    <input type="text" value={formData.businessCard} readOnly placeholder="사진을 선택하세요" />
                                </div>
                                <input 
                                    type="file" 
                                    id="camera-input" 
                                    style={{display: 'none'}}
                                    onChange={handleBusinessCardChange}
                                    accept="image/*"
                                    capture="environment"
                                />
                                <input 
                                    type="file" 
                                    id="gallery-input" 
                                    style={{display: 'none'}}
                                    onChange={handleBusinessCardChange}
                                    accept="image/*"
                                />
                                <button className="tb-btn-action tb-btn-action--green" onClick={handlePhotoClick}>사진찍기</button>
                            </div>
                        </div>
                    </div>

                    <div className="tb-section tb-section--blue">
                        <div className="tb-sh tb-sh--blue"><span>설치 정보 등록</span></div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--blue">예상 설치날짜</div>
                                <div className="tb-inp"><input type="date" value={formData.installDate} onChange={e=>h('installDate',e.target.value)} /></div>
                                <div className="tb-lbl tb-lbl--blue">예상 설치기간</div>
                                <div className="tb-inp"><select value={formData.installPeriod} onChange={e=>h('installPeriod',e.target.value)}><option>2일</option><option>3일</option><option>4일</option><option>5일</option></select></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--blue">설치 장소</div>
                                <div className="tb-inp"><input type="text" value={formData.installLocation} onChange={e=>h('installLocation',e.target.value)} /></div>
                                <div className="tb-lbl tb-lbl--blue">세부 장소</div>
                                <div className="tb-inp"><input type="text" value={formData.installDetail} onChange={e=>h('installDetail',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--blue">기타 내용</div>
                                <div className="tb-inp" style={{flex:3}}><input type="text" value={formData.installNote} onChange={e=>h('installNote',e.target.value)} /></div>
                            </div>
                        </div>
                    </div>

                    <div className="tb-footer">
                        <button className="tb-btn-next" onClick={nextStep}>다음 &gt;</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="tb-step">
                    <div className="tb-header"><img src={modalLogoImg} alt="logo" /></div>

                    <div className="tb-section">
                        <div className="tb-sh"><span>LED Display 제품 정보</span></div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl">제품명</div>
                                <div className="tb-inp" style={{flex:1}}><select value={formData.productName} onChange={e=>h('productName',e.target.value)}><option value="">--선택--</option>{products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}</select></div>
                                <div style={{flex:1}}></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">제품 사이즈</div>
                                <div className="tb-inp"><input type="text" value={formData.productSize} readOnly /></div>
                                <div className="tb-lbl">픽셀</div>
                                <div className="tb-inp"><input type="text" value={formData.pixel} readOnly /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">밝기</div>
                                <div className="tb-inp"><input type="text" value={formData.brightness} readOnly /></div>
                                <div className="tb-lbl">전력</div>
                                <div className="tb-inp"><input type="text" value={formData.power} readOnly /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">해상도</div>
                                <div className="tb-inp" style={{flex:1}}><input type="text" value={formData.resolution} readOnly /></div>
                                <div style={{flex:1}}></div>
                            </div>
                        </div>
                    </div>

                    <div className="tb-section">
                        <div className="tb-sh"><span>LED Display 구매 수량</span></div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl">수량</div>
                                <div className="tb-inp quantity-row">
                                    <span>W:</span>
                                    <select value={formData.ledWidth} onChange={e=>{if(e.target.value==='custom'){const v=prompt('가로 수량 입력:');if(v)h('ledWidth',Number(v))}else h('ledWidth',Number(e.target.value))}}>
                                        {Array.from({length:15},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
                                        {formData.ledWidth > 15 && <option value={formData.ledWidth}>{formData.ledWidth}</option>}
                                        <option value="custom">직접입력</option>
                                    </select>
                                    <span>X</span>
                                    <span>H:</span>
                                    <select value={formData.ledHeight} onChange={e=>{if(e.target.value==='custom'){const v=prompt('세로 수량 입력:');if(v)h('ledHeight',Number(v))}else h('ledHeight',Number(e.target.value))}}>
                                        {Array.from({length:15},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
                                        {formData.ledHeight > 15 && <option value={formData.ledHeight}>{formData.ledHeight}</option>}
                                        <option value="custom">직접입력</option>
                                    </select>
                                    <span>=</span>
                                    <input type="text" value={formData.totalPanels} readOnly />
                                    <span className="unit">EA</span>
                                </div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">LED 사이즈</div>
                                <div className="tb-inp"><input type="text" value={formData.ledSizeW} readOnly /></div>
                                <span style={{display:'flex',alignItems:'center',fontWeight:700,fontSize:'2.8vw',padding:'0 0.3vw'}}>X</span>
                                <div className="tb-inp"><input type="text" value={formData.ledSizeH} readOnly /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">LED 해상도</div>
                                <div className="tb-inp"><input type="text" value={formData.ledResolutionW} readOnly /></div>
                                <span style={{display:'flex',alignItems:'center',fontWeight:700,fontSize:'2.8vw',padding:'0 0.3vw'}}>X</span>
                                <div className="tb-inp"><input type="text" value={formData.ledResolutionH} readOnly /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">전체 전력</div>
                                <div className="tb-inp"><input type="text" value={formData.totalPower} readOnly /></div>
                                <div style={{flex:1}}></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">프로세스 사양</div>
                                <div className="tb-inp"><select value={formData.processorModel} onChange={e=>h('processorModel',e.target.value)}><option value="">--선택--</option>{vxProducts.map(v => <option key={v.id} value={v.modelName}>{v.modelName}</option>)}</select></div>
                                <div className="tb-lbl">프로세스 수량</div>
                                <div className="tb-inp"><select value={formData.processorQuantity} onChange={e=>h('processorQuantity',Number(e.target.value))}><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option></select></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">납품 설치 장소</div>
                                <div className="tb-inp">
                                    <select value={formData.deliveryLocation} onChange={e=>handleRegionChange(e.target.value)}>
                                        <option value="">--선택--</option>
                                        {REGIONS.map(r=><option key={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="tb-lbl">지방 출장비 외</div>
                                <div className="tb-inp" style={{gap:'4px'}}>
                                    <span style={{fontSize:'2.4vw',fontWeight:700,whiteSpace:'nowrap'}}>₩</span>
                                    <input type="text" value={formData.regionalTravelCost} onChange={e=>{const v=e.target.value.replace(/^0+/,'');h('regionalTravelCost',Number(v)||0)}} style={{flex:1}} />
                                </div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">설치인원</div>
                                <div className="tb-inp"><select value={formData.installWorkers} onChange={e=>{if(e.target.value==='custom'){const v=prompt('설치인원 입력:');if(v)h('installWorkers',Number(v))}else h('installWorkers',Number(e.target.value))}}>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n}명</option>)}{formData.installWorkers > 10 && <option value={formData.installWorkers}>{formData.installWorkers}명</option>}<option value="custom">직접입력</option></select></div>
                                <div className="tb-lbl">기타 재료비 외</div>
                                <div className="tb-inp" style={{gap:'4px'}}>
                                    <span style={{fontSize:'2.4vw',fontWeight:700,whiteSpace:'nowrap'}}>₩</span>
                                    <input type="text" value={formData.materialCost} onChange={e=>{const v=e.target.value.replace(/^0+/,'');h('materialCost',Number(v)||0)}} style={{flex:1}} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tb-section">
                        <div className="tb-sh"><span>LED Display 예상도</span></div>
                        <div className="tb-sb">
                            <div className="tb-preview-border">
                                <div className="tb-preview-layout">
                                    <div style={{display: 'flex', gap: '1vw', alignItems: 'center', width: '100%', position: 'relative'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', position: 'absolute', left: '0.5vw'}}>
                                            <div className="tb-preview-line-v-top"></div>
                                            <div className="tb-preview-label-v">{formData.ledSizeH}mm</div>
                                            <div className="tb-preview-line-v-bottom"></div>
                                        </div>
                                        <div style={{position: 'relative', margin: '0 auto'}}>
                                            <div className="tb-grid-container" style={{gridTemplateColumns: `repeat(${formData.ledWidth}, 1fr)`, gridTemplateRows: `repeat(${formData.ledHeight}, 1fr)`}}>
                                                {Array.from({length: formData.ledHeight * formData.ledWidth}).map((_, i) => (
                                                    <div key={i} className="tb-panel"></div>
                                                ))}
                                            </div>
                                            <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'visible'}}>
                                                <defs><marker id="ah1" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3BC1CC"/></marker><marker id="ah1r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="8 0, 0 3, 8 6" fill="#3BC1CC"/></marker></defs>
                                                <line x1="2%" y1="98%" x2="98%" y2="2%" stroke="#3BC1CC" strokeWidth="2.5" markerStart="url(#ah1r)" markerEnd="url(#ah1)"/>
                                            </svg>
                                            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'#3BC1CC',borderRadius:'4px',padding:'0.4vw 1.5vw',whiteSpace:'nowrap'}}>
                                                <span style={{color:'white',fontWeight:'bold',fontSize:'2.5vw'}}>{Math.round(Math.sqrt(Math.pow(Number(formData.ledSizeW)||0,2)+Math.pow(Number(formData.ledSizeH)||0,2))/25.4)}"</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '0', width: '60vw', marginLeft: 'auto', marginRight: 'auto'}}>
                                        <div className="tb-preview-line-h-left"></div>
                                        <div className="tb-preview-label-h">{formData.ledSizeW}mm</div>
                                        <div className="tb-preview-line-h-right"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tb-footer">
                        <button className="tb-btn-next" onClick={nextStep}>전체 내용 보기</button>
                    </div>
                </div>
            )}

            {step === 3 && !showQuote && (
                <div className="tb-step">
                    <div className="tb-header"><img src={modalLogoImg} alt="logo" /></div>

                    <div className="tb-section">
                        <div className="tb-sh" style={{justifyContent:'center'}}><span>LED Display 전체 내용 보기</span></div>
                        <div className="tb-sb">
                            <div className="tb-row"><div className="tb-lbl">날짜</div><div className="tb-val">{formData.date}</div></div>
                            <div className="tb-row">
                                <div className="tb-lbl">담당자</div><div className="tb-val">{formData.managerName}</div>
                                <div className="tb-lbl">부서</div><div className="tb-val">{formData.department}</div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">회사 연락처</div><div className="tb-val">{formData.managerPhone}</div>
                                <div className="tb-lbl">핸드폰 번호</div><div className="tb-val">{formData.managerMobile}</div>
                            </div>
                            <div className="tb-row"><div className="tb-lbl">E-mail</div><div className="tb-val" style={{flex:3}}>{formData.managerEmail}</div></div>
                            <div className="tb-row"><div className="tb-lbl">회사 주소</div><div className="tb-val" style={{flex:3}}>{formData.companyAddress}</div></div>
                            <div className="tb-row"><div className="tb-lbl">첨부파일</div><div className="tb-val" style={{flex:3}}>{(formData.attachment || '').split('/').pop().replace(/^[^_]*_/, '')}</div></div>

                            <div className="tb-divider"></div>

                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--blue">예상 설치날짜</div><div className="tb-val">{formData.installDate}</div>
                                <div className="tb-lbl tb-lbl--blue">예상 설치기간</div><div className="tb-val">{formData.installPeriod}</div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl tb-lbl--blue">설치 장소</div><div className="tb-val">{formData.installLocation}</div>
                                <div className="tb-lbl tb-lbl--blue">세부 장소</div><div className="tb-val">{formData.installDetail}</div>
                            </div>
                            <div className="tb-row"><div className="tb-lbl tb-lbl--blue">기타 내용</div><div className="tb-val" style={{flex:3}}>{formData.installNote}</div></div>

                            <div className="tb-divider"></div>

                            <div className="tb-row"><div className="tb-lbl">제품명</div><div className="tb-val" style={{flex:3}}>{formData.productName}</div></div>
                            <div className="tb-row">
                                <div className="tb-lbl">제품 사이즈</div><div className="tb-val">{formData.productSize}</div>
                                <div className="tb-lbl">픽셀</div><div className="tb-val">{formData.pixel}</div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">밝기</div><div className="tb-val">{formData.brightness}</div>
                                <div className="tb-lbl">전력</div><div className="tb-val">{formData.power}</div>
                            </div>
                            <div className="tb-row"><div className="tb-lbl">해상도</div><div className="tb-val" style={{flex:3}}>{formData.resolution}</div></div>

                            <div className="tb-divider"></div>

                            <div className="tb-row"><div className="tb-lbl">수량</div><div className="tb-val" style={{flex:3}}>W : {formData.ledWidth}   X   H : {formData.ledHeight}   =   {formData.totalPanels}EA</div></div>
                            <div className="tb-row"><div className="tb-lbl">LED 사이즈</div><div className="tb-val" style={{flex:3}}>{formData.ledSizeW} x {formData.ledSizeH}</div></div>
                            <div className="tb-row"><div className="tb-lbl">LED 해상도</div><div className="tb-val" style={{flex:3}}>{formData.ledResolutionW} x {formData.ledResolutionH}</div></div>
                            <div className="tb-row"><div className="tb-lbl">전체 전력</div><div className="tb-val">{formData.totalPower}</div><div style={{flex:1}}></div></div>
                            {formData.processorModel && (
                            <div className="tb-row">
                                <div className="tb-lbl">프로세스 사양</div><div className="tb-val">{formData.processorModel}</div>
                                <div className="tb-lbl">프로세스 수량</div><div className="tb-val">{formData.processorQuantity}EA</div>
                            </div>
                            )}
                            <div className="tb-row">
                                <div className="tb-lbl">납품 설치 장소</div><div className="tb-val">{formData.deliveryLocation}</div>
                                <div className="tb-lbl">지방 출장비 외</div><div className="tb-val">₩ {fmt(formData.regionalTravelCost)}</div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">설치인원</div><div className="tb-val">{formData.installWorkers}명</div>
                                <div className="tb-lbl">기타 재료비 외</div><div className="tb-val">₩ {fmt(formData.materialCost)}</div>
                            </div>
                        </div>
                    </div>

                    {/* LED Display 예상도 */}
                    <div className="tb-section">
                        <div className="tb-sb">
                            <div className="tb-preview-border">
                                <div className="tb-preview-layout">
                                    <div style={{display: 'flex', gap: '1vw', alignItems: 'center', width: '100%', position: 'relative'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', position: 'absolute', left: '0.5vw'}}>
                                            <div className="tb-preview-line-v-top"></div>
                                            <div className="tb-preview-label-v">{formData.ledSizeH}mm</div>
                                            <div className="tb-preview-line-v-bottom"></div>
                                        </div>
                                        <div style={{position: 'relative', margin: '0 auto'}}>
                                            <div className="tb-grid-container" style={{gridTemplateColumns: `repeat(${formData.ledWidth}, 1fr)`, gridTemplateRows: `repeat(${formData.ledHeight}, 1fr)`}}>
                                                {Array.from({length: formData.ledHeight * formData.ledWidth}).map((_, i) => (
                                                    <div key={i} className="tb-panel"></div>
                                                ))}
                                            </div>
                                            <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'visible'}}>
                                                <defs><marker id="ah2" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3BC1CC"/></marker><marker id="ah2r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="8 0, 0 3, 8 6" fill="#3BC1CC"/></marker></defs>
                                                <line x1="2%" y1="98%" x2="98%" y2="2%" stroke="#3BC1CC" strokeWidth="2.5" markerStart="url(#ah2r)" markerEnd="url(#ah2)"/>
                                            </svg>
                                            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'#3BC1CC',borderRadius:'4px',padding:'0.4vw 1.5vw',whiteSpace:'nowrap'}}>
                                                <span style={{color:'white',fontWeight:'bold',fontSize:'2.5vw'}}>{Math.round(Math.sqrt(Math.pow(Number(formData.ledSizeW)||0,2)+Math.pow(Number(formData.ledSizeH)||0,2))/25.4)}"</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '0', width: '60vw', marginLeft: 'auto', marginRight: 'auto'}}>
                                        <div className="tb-preview-line-h-left"></div>
                                        <div className="tb-preview-label-h">{formData.ledSizeW}mm</div>
                                        <div className="tb-preview-line-h-right"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tb-footer">
                        <button className="tb-btn-next" onClick={() => { setStep(1); window.scrollTo(0,0); }}>수정하기</button>
                        <button className="tb-btn-next" style={{background:'#8BC53E'}} onClick={() => { if (!formData.productName) return alert('제품명을 선택해주세요'); if (!formData.installLocation) return alert('납품 설치 장소를 선택해주세요'); setShowQuote(true); window.scrollTo(0, 0); }}>견적서 보기</button>
                    </div>
                </div>
            )}

            {step === 3 && showQuote && (
                <>
                <div ref={viewContentRef} style={{position:'absolute',left:'-9999px',top:0,width:'1000px',fontSize:'2.2vw'}}>
                    <div className="tb-step" style={{padding:'3vw'}}>
                        <div className="tb-header"><img src={modalLogoImg} alt="logo" /></div>
                        <div className="tb-section">
                            <div className="tb-sh" style={{justifyContent:'center'}}><span>LED Display 전체 내용 보기</span></div>
                            <div className="tb-sb">
                                <div className="tb-row"><div className="tb-lbl">날짜</div><div className="tb-val">{formData.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/,(m,y,mo,d)=>`${y.slice(2)}.${mo}.${d}`)}</div></div>
                                <div className="tb-row"><div className="tb-lbl">담당자</div><div className="tb-val">{formData.managerName}</div><div className="tb-lbl">부서</div><div className="tb-val">{formData.department}</div></div>
                                <div className="tb-row"><div className="tb-lbl">회사 연락처</div><div className="tb-val"><span style={{fontSize:'1.5vw'}}>{formData.managerPhone}</span></div><div className="tb-lbl">핸드폰 번호</div><div className="tb-val"><span style={{fontSize:'1.5vw'}}>{formData.managerMobile}</span></div></div>
                                <div className="tb-row"><div className="tb-lbl">E-mail</div><div className="tb-val" style={{flex:3}}>{formData.managerEmail}</div></div>
                                <div className="tb-row"><div className="tb-lbl">회사 주소</div><div className="tb-val" style={{flex:3}}>{formData.companyAddress}</div></div>
                                <div className="tb-row"><div className="tb-lbl">첨부파일</div><div className="tb-val" style={{flex:3}}>{(formData.attachment||'').split('/').pop().replace(/^[^_]*_/,'')}</div></div>
                                <div className="tb-divider"></div>
                                <div className="tb-row"><div className="tb-lbl tb-lbl--blue">예상 설치날짜</div><div className="tb-val">{formData.installDate.replace(/^(\d{4})-(\d{2})-(\d{2})$/,(m,y,mo,d)=>`${y.slice(2)}.${mo}.${d}`)}</div><div className="tb-lbl tb-lbl--blue">예상 설치기간</div><div className="tb-val">{formData.installPeriod}</div></div>
                                <div className="tb-row"><div className="tb-lbl tb-lbl--blue">설치 장소</div><div className="tb-val">{formData.installLocation}</div><div className="tb-lbl tb-lbl--blue">세부 장소</div><div className="tb-val">{formData.installDetail}</div></div>
                                <div className="tb-row"><div className="tb-lbl tb-lbl--blue">기타 내용</div><div className="tb-val" style={{flex:3}}>{formData.installNote}</div></div>
                                <div className="tb-divider"></div>
                                <div className="tb-row"><div className="tb-lbl">제품명</div><div className="tb-val" style={{flex:3}}>{formData.productName}</div></div>
                                <div className="tb-row"><div className="tb-lbl">제품 사이즈</div><div className="tb-val">{formData.productSize}</div><div className="tb-lbl">픽셀</div><div className="tb-val">{formData.pixel}</div></div>
                                <div className="tb-row"><div className="tb-lbl">밝기</div><div className="tb-val">{formData.brightness}</div><div className="tb-lbl">전력</div><div className="tb-val">{formData.power}</div></div>
                                <div className="tb-row"><div className="tb-lbl">해상도</div><div className="tb-val" style={{flex:3}}>{formData.resolution}</div></div>
                                <div className="tb-divider"></div>
                                <div className="tb-row"><div className="tb-lbl">수량</div><div className="tb-val" style={{flex:3}}>W : {formData.ledWidth} X H : {formData.ledHeight} = {formData.totalPanels}EA</div></div>
                                <div className="tb-row"><div className="tb-lbl">LED 사이즈</div><div className="tb-val" style={{flex:3}}>{formData.ledSizeW} x {formData.ledSizeH}</div></div>
                                <div className="tb-row"><div className="tb-lbl">LED 해상도</div><div className="tb-val" style={{flex:3}}>{formData.ledResolutionW} x {formData.ledResolutionH}</div></div>
                                <div className="tb-row"><div className="tb-lbl">전체 전력</div><div className="tb-val">{formData.totalPower}</div><div style={{flex:1}}></div></div>
                                {formData.processorModel && (
                                <div className="tb-row"><div className="tb-lbl">프로세스 사양</div><div className="tb-val">{formData.processorModel}</div><div className="tb-lbl">프로세스 수량</div><div className="tb-val">{formData.processorQuantity}EA</div></div>
                                )}
                                <div className="tb-row"><div className="tb-lbl">납품 설치 장소</div><div className="tb-val">{formData.deliveryLocation}</div><div className="tb-lbl">지방 출장비 외</div><div className="tb-val">₩ {fmt(formData.regionalTravelCost)}</div></div>
                                <div className="tb-row"><div className="tb-lbl">설치인원</div><div className="tb-val">{formData.installWorkers}명</div><div className="tb-lbl">기타 재료비 외</div><div className="tb-val">₩ {fmt(formData.materialCost)}</div></div>
                            </div>
                        </div>
                        {/* LED Display 예상도 - PDF 캡처용 */}
                        <div className="tb-section">
                            <div className="tb-sb">
                                <div style={{padding:'20px', background:'white'}}>
                                    <div style={{display:'flex', gap:'20px', alignItems:'center', width:'100%', position:'relative'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', position:'absolute', left:'10px', top:0, bottom:0}}>
                                            <div style={{width:'1px', flex:1, background:'#3BC1CC'}}></div>
                                            <div style={{background:'#3BC1CC', color:'white', padding:'2px 8px', borderRadius:'3px', fontSize:'12px', whiteSpace:'nowrap'}}>{formData.ledSizeH}mm</div>
                                            <div style={{width:'1px', flex:1, background:'#3BC1CC'}}></div>
                                        </div>
                                        <div style={{position:'relative', margin:'0 auto', width:'600px', height:'300px'}}>
                                            <div style={{display:'grid', gridTemplateColumns:`repeat(${formData.ledWidth}, 1fr)`, gridTemplateRows:`repeat(${formData.ledHeight}, 1fr)`, gap:'2px', width:'100%', height:'100%'}}>
                                                {Array.from({length: formData.ledHeight * formData.ledWidth}).map((_, i) => (
                                                    <div key={i} style={{background:'#333', border:'1px solid #444'}}></div>
                                                ))}
                                            </div>
                                            <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',overflow:'visible'}}>
                                                <defs><marker id="ahPdf" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3BC1CC"/></marker><marker id="ahPdfR" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="8 0, 0 3, 8 6" fill="#3BC1CC"/></marker></defs>
                                                <line x1="2%" y1="98%" x2="98%" y2="2%" stroke="#3BC1CC" strokeWidth="2.5" markerStart="url(#ahPdfR)" markerEnd="url(#ahPdf)"/>
                                            </svg>
                                            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'#3BC1CC',borderRadius:'4px',padding:'4px 12px',whiteSpace:'nowrap'}}>
                                                <span style={{color:'white',fontWeight:'bold',fontSize:'18px'}}>{Math.round(Math.sqrt(Math.pow(Number(formData.ledSizeW)||0,2)+Math.pow(Number(formData.ledSizeH)||0,2))/25.4)}"</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center', width:'600px', margin:'10px auto 0'}}>
                                        <div style={{flex:1, height:'1px', background:'#3BC1CC'}}></div>
                                        <div style={{background:'#3BC1CC', color:'white', padding:'2px 8px', borderRadius:'3px', fontSize:'12px', whiteSpace:'nowrap'}}>{formData.ledSizeW}mm</div>
                                        <div style={{flex:1, height:'1px', background:'#3BC1CC'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tb-step" id="tb-quote-step">
                    <div className="tb-quote">
                        <div className="tb-quote-header">
                            <div></div>
                            <div className="tb-quote-title">견 적 서</div>
                            <div className="tb-quote-logo"><img src={easytechLogo} alt="logo" /></div>
                        </div>
                        <div className="tb-quote-date">DATE : {formData.date}</div>

                        <div className="tb-quote-section">
                            <div className="tb-quote-section-title">판매 견적서</div>
                            <table className="tb-ct"><colgroup><col style={{width:'15vw'}}/><col/><col style={{width:'15vw'}}/><col/></colgroup><tbody>
                                <tr>
                                    <td className="tb-ct-label">기관/업체명</td>
                                    <td className="tb-ct-value" colSpan={3}>{formData.clientName}</td>
                                </tr>
                                <tr>
                                    <td className="tb-ct-label">부서명</td>
                                    <td className="tb-ct-value">{formData.clientDepartment}</td>
                                    <td className="tb-ct-label">업체 담당자</td>
                                    <td className="tb-ct-value">{formData.clientManager}</td>
                                </tr>
                                <tr>
                                    <td className="tb-ct-label">회사 연락처</td>
                                    <td className="tb-ct-value">{formData.clientPhone}</td>
                                    <td className="tb-ct-label">핸드폰 번호</td>
                                    <td className="tb-ct-value">{formData.clientMobile}</td>
                                </tr>
                            </tbody></table>

                            <hr className="tb-quote-divider" />

                            <table className="tb-it"><thead><tr>
                                <th>순번</th><th>품명</th><th>규격(인,장소)</th><th>수량</th><th>단가</th><th>가격</th>
                            </tr></thead><tbody>
                                <tr>
                                    <td rowSpan={2} className="tb-it-center">1</td>
                                    <td rowSpan={2} className="tb-it-product">
                                        {productImageUrl && <img src={productImageUrl} alt={formData.productName} style={{maxWidth:'100%',maxHeight:'8vw',display:'block',margin:'0 auto 0.3vw'}} />}
                                        {formData.productName}
                                    </td>
                                    <td className="tb-it-center">{formData.productSize}</td>
                                    <td className="tb-it-center">{formData.totalPanels}</td>
                                    <td className="tb-it-right">₩ {fmt(panelPrice)}</td>
                                    <td className="tb-it-right" rowSpan={2}>₩ {fmt(ledTotal)}</td>
                                </tr>
                                <tr>
                                    <td className="tb-it-center">sqm</td>
                                    <td className="tb-it-center">{ledSqm}</td>
                                    <td className="tb-it-right">₩ {fmt(sqmPrice)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(ledTotal)}</td>
                                </tr>
                                {formData.processorModel && (
                                <>
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">2</td>
                                    <td className="tb-it-product">
                                        {processorImageUrl && <img src={processorImageUrl} alt={formData.processorModel} style={{maxWidth:'100%',maxHeight:'8vw',display:'block',margin:'0 auto 0.3vw'}} />}
                                        {formData.processorModel}
                                    </td>
                                    <td className="tb-it-center">-</td>
                                    <td className="tb-it-center">{formData.processorQuantity}</td>
                                    <td className="tb-it-right">₩ {fmt(processorPrice)}</td>
                                    <td className="tb-it-right">₩ {fmt(processorTotal)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(processorTotal)}</td>
                                </tr>
                                </>
                                )}
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">{formData.processorModel ? 3 : 2}</td>
                                    <td className="tb-it-product"><span style={{fontSize:'2vw'}}>시공 인건비</span></td>
                                    <td className="tb-it-center">인</td>
                                    <td className="tb-it-center">{formData.installWorkers}</td>
                                    <td className="tb-it-right">₩ {fmt(workerPrice)}</td>
                                    <td className="tb-it-right">₩ {fmt(laborTotal)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(laborTotal)}</td>
                                </tr>
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">{formData.processorModel ? 4 : 3}</td>
                                    <td className="tb-it-product"><span style={{fontSize:'2vw'}}>기타 재료 비용 외</span></td>
                                    <td className="tb-it-center">EA</td>
                                    <td className="tb-it-center">1</td>
                                    <td className="tb-it-right">₩ {fmt(materialTotal)}</td>
                                    <td className="tb-it-right">₩ {fmt(materialTotal)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(materialTotal)}</td>
                                </tr>
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">{formData.processorModel ? 5 : 4}</td>
                                    <td className="tb-it-product"><span style={{fontSize:'2vw'}}>지방 출장비 [{formData.deliveryLocation}]<br/><span style={{color:'#0066CC'}}>(운송비,숙박,기타)</span></span></td>
                                    <td className="tb-it-center">지역</td>
                                    <td className="tb-it-center">1</td>
                                    <td className="tb-it-right">₩ {fmt(travelTotal)}</td>
                                    <td className="tb-it-right">₩ {fmt(travelTotal)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(travelTotal)}</td>
                                </tr>
                            </tbody></table>

                            <div className="tb-quote-note">*설치 구조물 / UTP케이블 작업 / 전기 공사 비용은 현장실측 이후 측정 됩니다.</div>

                            <table className="tb-tt"><tbody>
                                <tr className="tb-tt-mint">
                                    <td className="tb-tt-label">판매</td>
                                    <td className="tb-tt-desc">LED 디스플레이 판매가 (1+2)</td>
                                    <td className="tb-tt-amount">₩ {fmt(salesTotal)}</td>
                                </tr>
                                <tr className="tb-tt-green">
                                    <td className="tb-tt-label">추가</td>
                                    <td className="tb-tt-desc">시공비 + 기타 재료비 + 지방출장비</td>
                                    <td className="tb-tt-amount">₩ {fmt(addTotal)}</td>
                                </tr>
                                <tr style={{height: '0'}}><td colSpan={3} style={{background: 'transparent', border: 'none'}}></td></tr>
                                <tr className="tb-tt-grand">
                                    <td colSpan={2} className="tb-tt-label">합 계</td>
                                    <td className="tb-tt-amount">₩ {fmt(grandTotal)}</td>
                                </tr>
                            </tbody></table>
                        </div>

                        <div className="tb-terms">
                            <div className="tb-terms-text">
                                <p className="tb-terms-icon">견적조건</p>
                                <p className="tb-terms-indent">1. 견적서 항목 외 추가 사항이나, 현장 추가 사항은 별도의 금액이 추가됩니다.</p>
                                <p className="tb-terms-indent">2. 전력 및 통신은 고객사가 기본 제공하며 , 미 제공시 증설 공사 금액이 추가됩니다.</p>
                                <p className="tb-terms-indent">3. 현장 상황에 따라 보강 구조물 필요시 제작 비용이 추가됩니다.</p>
                                <p className="tb-terms-indent">4. 인,허가 사항은 별도 입니다.</p>
                                <p className="tb-terms-icon">결제조건 : 발주시 계약금 60% , 잔금 40%로 진행 됩니다</p>
                                <p className="tb-terms-icon">납  기  일: 발주일로 부터 30일 (모델 및 수량에 따라 변동 될 수 있습니다)</p>
                                <p className="tb-terms-icon">A/S 기간 : 납기일로 부터 5년 무상 (단, 천재지변 및 고객 부주의로 인한 제품 파손 시 비용이 청구 됩니다)</p>
                                <p className="tb-terms-icon">제품의 성능 향상을 위해 제품 스펙은 일부 변경 될 수 있습니다.</p>
                                <p className="tb-terms-icon">입금계좌 : 하나은행 471-910014-06704 예금주 : ㈜이지텍인터내셔널</p>
                            </div>
                            <div className="tb-stamp">
                                <img src={stampImg} alt="stamp" className="tb-stamp-img" />
                            </div>
                        </div>
                    </div>

                    <div className="tb-footer">
                        <button className="tb-btn-next" onClick={() => { setStep(1); setShowQuote(false); window.scrollTo(0, 0); }}>처음으로</button>
                        <button className="tb-btn-next" disabled={isSendingEmail} onClick={async () => {
                            const to = prompt('받는 사람 이메일 주소를 입력하세요:', formData.clientEmail || '')
                            if (!to) return
                            setIsSendingEmail(true)
                            try {
                                // 담당자 정보 가져오기
                                const manager = managerList.find(m => m.name === formData.managerName)
                                const emailSubject = manager?.emailSubject || '이지텍인터내셔널 - LED Display 견적 송부의 건'
                                const emailBody = manager?.emailBody || `안녕하십니까.\n\nLED 디스플레이 전문업체 이지텍인터내셔널입니다.\n\nLED Display 견적 송부 드리오니 확인 부탁드리겠습니다.\n\n감사합니다.\n\n${formData.managerName || ''} 드림.`
                                
                                // 1) 전체내용보기 캡처
                                const viewEl = viewContentRef.current
                                const origStyle = viewEl.style.cssText
                                viewEl.style.cssText = 'position:absolute;left:-9999px;top:0;width:1000px;font-size:22px;'
                                await new Promise(r => setTimeout(r, 300))
                                const viewH = viewEl.querySelector('.tb-step').getBoundingClientRect().height
                                let viewCanvas = await html2canvas(viewEl, {scale: 2, useCORS: true, allowTaint: true, width: 1000, height: Math.ceil(viewH), windowWidth: 1000, windowHeight: Math.ceil(viewH) + 50})
                                viewEl.style.cssText = origStyle
                                // 하단 빈 공간 제거
                                const vCtx = viewCanvas.getContext('2d')
                                const vData = vCtx.getImageData(0, 0, viewCanvas.width, viewCanvas.height)
                                let trimH = viewCanvas.height
                                for (let y = viewCanvas.height - 1; y > 0; y--) {
                                    let blank = true
                                    for (let x = 0; x < viewCanvas.width; x += 10) {
                                        const i = (y * viewCanvas.width + x) * 4
                                        if (vData.data[i] < 250 || vData.data[i+1] < 250 || vData.data[i+2] < 250) { blank = false; break }
                                    }
                                    if (!blank) { trimH = y + 20; break }
                                }
                                if (trimH < viewCanvas.height) {
                                    const trimmed = document.createElement('canvas')
                                    trimmed.width = viewCanvas.width
                                    trimmed.height = trimH
                                    trimmed.getContext('2d').drawImage(viewCanvas, 0, 0)
                                    viewCanvas = trimmed
                                }
                                // 2) 견적서 캡처
                                const el = document.getElementById('tb-quote-step')
                                const footer = el.querySelector('.tb-footer')
                                if (footer) footer.style.display = 'none'
                                const saved = { overflow: el.style.overflow, width: el.style.width, boxSizing: el.style.boxSizing }
                                el.style.overflow = 'visible'
                                el.style.width = (el.offsetWidth) + 'px'
                                el.style.boxSizing = 'border-box'
                                await new Promise(r => setTimeout(r, 200))
                                const rect = el.getBoundingClientRect()
                                let quoteCanvas = await html2canvas(el, {scale: 2, useCORS: true, allowTaint: true, scrollX: 0, scrollY: 0, width: rect.width, height: el.scrollHeight + 50, windowWidth: rect.width + 50, windowHeight: el.scrollHeight + 200})
                                Object.assign(el.style, saved)
                                if (footer) footer.style.display = ''
                                // 견적서 하단 빈 공간 트림
                                const qCtx = quoteCanvas.getContext('2d')
                                const qData = qCtx.getImageData(0, 0, quoteCanvas.width, quoteCanvas.height)
                                let qTrimH = quoteCanvas.height
                                for (let y = quoteCanvas.height - 1; y > 0; y--) {
                                    let blank = true
                                    for (let x = 0; x < quoteCanvas.width; x += 10) {
                                        const i = (y * quoteCanvas.width + x) * 4
                                        if (qData.data[i] < 250 || qData.data[i+1] < 250 || qData.data[i+2] < 250) { blank = false; break }
                                    }
                                    if (!blank) { qTrimH = y + 20; break }
                                }
                                if (qTrimH < quoteCanvas.height) {
                                    const t = document.createElement('canvas')
                                    t.width = quoteCanvas.width; t.height = qTrimH
                                    t.getContext('2d').drawImage(quoteCanvas, 0, 0)
                                    quoteCanvas = t
                                }
                                
                                // 3) PDF 생성
                                const imgW = 210
                                const vH = viewCanvas.height * imgW / viewCanvas.width
                                const qH = quoteCanvas.height * imgW / quoteCanvas.width
                                const pdf = new jsPDF('p', 'mm', [imgW, vH])
                                pdf.addImage(viewCanvas.toDataURL('image/jpeg', 0.85), 'JPEG', 0, 0, imgW, vH)
                                pdf.addPage([imgW, qH])
                                pdf.addImage(quoteCanvas.toDataURL('image/jpeg', 0.85), 'JPEG', 0, 0, imgW, qH)
                                
                                const pdfBlob = pdf.output('blob')
                                const fd = new FormData()
                                fd.append('to', to)
                                fd.append('subject', emailSubject)
                                fd.append('body', emailBody)
                                if (manager?.businessCardImage) {
                                    fd.append('businessCardImage', manager.businessCardImage)
                                }
                                if (manager?.attachmentFile) {
                                    fd.append('managerAttachment', manager.attachmentFile)
                                }
                                if (attachmentFile?.length) {
                                    attachmentFile.forEach(f => fd.append('extraFiles', f))
                                }
                                const pdfDate = formData.date ? formData.date.slice(2).replace(/-/g, '.') : ''
                                fd.append('file', pdfBlob, `${formData.clientName || '업체'}_${formData.productName || '제품'} 견적서_${pdfDate}.pdf`)
                                const res = await fetch(import.meta.env.VITE_API_URL + '/api/email/send', {method: 'POST', body: fd})
                                if (!res.ok) throw new Error(`서버 오류 (${res.status}). 첨부파일 용량을 확인해주세요.`)
                                const data = await res.json()
                                alert(data.success ? '메일이 발송되었습니다.' : data.message)
                            } catch (e) { alert('메일 발송 실패: ' + e.message) }
                            finally { setIsSendingEmail(false) }
                        }}>메일 보내기</button>
                    </div>
                </div>
                </>
            )}

            {isSendingEmail && (
                <div className="tb-modal-overlay">
                    <div className="tb-spinner-wrap">
                        <div className="tb-spinner"></div>
                        <p>메일 발송 중...</p>
                    </div>
                </div>
            )}

            {showPhotoOptions && (
                <div className="tb-modal-overlay" onClick={() => setShowPhotoOptions(false)}>
                    <div className="tb-photo-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>사진 선택</h3>
                        <button className="tb-photo-option" onClick={handleCameraCapture}>
                            카메라로 촬영
                        </button>
                        <button className="tb-photo-option" onClick={handleGallerySelect}>
                            갤러리에서 선택
                        </button>
                        <button className="tb-photo-cancel" onClick={() => setShowPhotoOptions(false)}>
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TabletEstimateForm
