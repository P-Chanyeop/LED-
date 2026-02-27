import { useState } from 'react'
import './TabletEstimateForm.css'
import modalLogoImg from '../assets/modal-logo2.png'

const REGIONS = ['서울','경기','인천','부산','경남','대구','울산','경북','대전','세종','충남','충북','전북','광주','전남','강원','제주']
const FREE_REGIONS = ['서울','경기','인천']

function TabletEstimateForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        managerName: '', department: '', managerPhone: '', managerMobile: '',
        managerEmail: '', companyAddress: '', attachment: '',
        clientName: '', clientDepartment: '', clientManager: '',
        clientPhone: '', clientMobile: '', clientEmail: '', businessCard: '',
        installDate: '', installPeriod: '2일', installLocation: '', installDetail: '', installNote: '',
        productName: 'ETK-COB1.2', productSize: '600x337.5', pixel: '1.2 Pixel',
        brightness: '800 Nit', power: '75/25 W', resolution: '480x270 Dpi',
        ledWidth: 7, ledHeight: 6, ledSizeW: 4200, ledSizeH: 2025,
        ledResolutionW: 3360, ledResolutionH: 1620, totalPower: '427 W',
        processorModel: 'VX600 Pro', processorQuantity: 1, totalPanels: 42,
        installWorkers: 3,
        deliveryLocation: '서울',
        regionalTravelCost: 0,
        materialCost: 100000,
    })

    const h = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))
    const nextStep = () => { if (step < 3) setStep(step + 1) }
    const prevStep = () => { if (step > 1) setStep(step - 1) }

    const handleRegionChange = (region) => {
        h('deliveryLocation', region)
        if (FREE_REGIONS.includes(region)) h('regionalTravelCost', 0)
    }

    // 견적 계산
    const panelPrice = 950000
    const sqmPrice = 4691358
    const processorPrice = 3000000
    const workerPrice = 300000
    const ledTotal = panelPrice * formData.totalPanels
    const processorTotal = processorPrice * formData.processorQuantity
    const laborTotal = workerPrice * formData.installWorkers
    const materialTotal = formData.materialCost
    const travelTotal = formData.regionalTravelCost
    const salesTotal = ledTotal + processorTotal
    const addTotal = laborTotal + materialTotal + travelTotal
    const grandTotal = salesTotal + addTotal

    const fmt = (n) => n.toLocaleString()

    return (
        <div className="tb-container">
            {/* Step 1 */}
            {step === 1 && (
                <div className="tb-step">
                    <div className="tb-header"><img src={modalLogoImg} alt="logo" /></div>

                    {/* 담당자 등록 */}
                    <div className="tb-section">
                        <div className="tb-sh">
                            <span>담당자 등록</span>
                            <button className="tb-btn-reset">Reset</button>
                        </div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl">날짜</div>
                                <div className="tb-inp"><input type="date" value={formData.date} onChange={e=>h('date',e.target.value)} /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">담당자</div>
                                <div className="tb-inp"><input type="text" value={formData.managerName} onChange={e=>h('managerName',e.target.value)} /></div>
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
                                <div className="tb-inp" style={{flex:2}}><input type="text" value={formData.attachment} onChange={e=>h('attachment',e.target.value)} /></div>
                                <button className="tb-btn-action">첨부하기</button>
                            </div>
                        </div>
                    </div>

                    {/* 업체 담당자 등록 */}
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
                                <div className="tb-inp" style={{flex:2}}><input type="text" value={formData.businessCard} onChange={e=>h('businessCard',e.target.value)} /></div>
                                <button className="tb-btn-action tb-btn-action--green">사진찍기</button>
                            </div>
                        </div>
                    </div>

                    {/* 설치 정보 등록 */}
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

            {/* Step 2 */}
            {step === 2 && (
                <div className="tb-step">
                    <div className="tb-header"><img src={modalLogoImg} alt="logo" /></div>

                    {/* LED Display 제품 정보 */}
                    <div className="tb-section">
                        <div className="tb-sh"><span>LED Display 제품 정보</span></div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl">제품명</div>
                                <div className="tb-inp"><select value={formData.productName} onChange={e=>h('productName',e.target.value)}><option>ETK-COB1.2</option><option>ETK-COB1.5</option></select></div>
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
                                <div className="tb-inp" style={{flex:3}}><input type="text" value={formData.resolution} readOnly /></div>
                            </div>
                        </div>
                    </div>

                    {/* LED Display 구매 수량 */}
                    <div className="tb-section">
                        <div className="tb-sh"><span>LED Display 구매 수량</span></div>
                        <div className="tb-sb">
                            <div className="tb-row">
                                <div className="tb-lbl">수량</div>
                                <div className="tb-inp" style={{gap:'8px',paddingLeft:'12px',fontSize:'26px'}}>
                                    W: <input type="number" min="1" max="15" value={formData.ledWidth} style={{width:'100px'}} onChange={e=>h('ledWidth',Number(e.target.value))} />
                                    <span style={{fontSize:'18px',color:'#888'}}>1~15</span>
                                </div>
                                <div className="tb-inp" style={{gap:'8px',paddingLeft:'12px',fontSize:'26px'}}>
                                    H: <input type="number" min="1" max="15" value={formData.ledHeight} style={{width:'100px'}} onChange={e=>h('ledHeight',Number(e.target.value))} />
                                    <span style={{fontSize:'18px',color:'#888'}}>1~15</span>
                                </div>
                                <div className="tb-inp" style={{fontSize:'26px',paddingLeft:'12px'}}>
                                    = {formData.totalPanels} <span style={{fontSize:'32px',fontWeight:700}}>EA</span>
                                </div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">LED 사이즈</div>
                                <div className="tb-inp"><input type="text" value={formData.ledSizeW} readOnly /></div>
                                <div className="tb-inp" style={{fontSize:'26px',paddingLeft:'12px'}}>X <input type="text" value={formData.ledSizeH} readOnly /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">LED 해상도</div>
                                <div className="tb-inp"><input type="text" value={formData.ledResolutionW} readOnly /></div>
                                <div className="tb-inp" style={{fontSize:'26px',paddingLeft:'12px'}}>X <input type="text" value={formData.ledResolutionH} readOnly /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">전체 전력</div>
                                <div className="tb-inp"><input type="text" value={formData.totalPower} readOnly /></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">프로세스 사양</div>
                                <div className="tb-inp"><select value={formData.processorModel} onChange={e=>h('processorModel',e.target.value)}><option>VX600 Pro</option><option>VX1000 Pro</option></select></div>
                                <div className="tb-lbl">프로세스 수량</div>
                                <div className="tb-inp"><select value={formData.processorQuantity} onChange={e=>h('processorQuantity',Number(e.target.value))}><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option></select></div>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">납품 설치 장소</div>
                                <div className="tb-inp">
                                    <select value={formData.deliveryLocation} onChange={e=>handleRegionChange(e.target.value)}>
                                        {REGIONS.map(r=><option key={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div className="tb-lbl">지방 출장비 외</div>
                                <div className="tb-inp" style={{gap:'8px'}}>
                                    <input type="number" value={formData.regionalTravelCost} onChange={e=>h('regionalTravelCost',Number(e.target.value))} />
                                    <span style={{fontSize:'18px',color:'#888',whiteSpace:'nowrap'}}>직접입력</span>
                                </div>
                            </div>
                            <div className="tb-hint">
                                {REGIONS.join(' / ')}
                                <span style={{marginLeft:'20px',color:'#666'}}>서울,경기,인천 지방출장비 0원</span>
                            </div>
                            <div className="tb-row">
                                <div className="tb-lbl">설치인원</div>
                                <div className="tb-inp"><select value={formData.installWorkers} onChange={e=>h('installWorkers',Number(e.target.value))}><option value={3}>3명</option><option value={4}>4명</option><option value={5}>5명</option></select></div>
                                <div className="tb-lbl">기타 재료비 외</div>
                                <div className="tb-inp" style={{gap:'8px'}}>
                                    <input type="number" value={formData.materialCost} onChange={e=>h('materialCost',Number(e.target.value))} />
                                    <span style={{fontSize:'18px',color:'#888',whiteSpace:'nowrap'}}>직접입력</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LED Display 예상도 */}
                    <div className="tb-section">
                        <div className="tb-sh"><span>LED Display 예상도</span></div>
                        <div className="tb-sb">
                            <div className="tb-preview-border">
                                <div className="tb-preview-layout">
                                    <div className="tb-preview-v"><span>{formData.ledSizeH}mm</span></div>
                                    <div className="tb-grid-container">
                                        {Array.from({length: formData.ledHeight}).map((_,r) => (
                                            <div key={r} className="tb-grid-row">
                                                {Array.from({length: formData.ledWidth}).map((_,c) => (
                                                    <div key={c} className="tb-panel"></div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="tb-preview-h"><span>{formData.ledSizeW}mm</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tb-footer">
                        <button className="tb-btn-prev" onClick={prevStep}>이전</button>
                        <button className="tb-btn-next" onClick={nextStep}>전체 내용 보기</button>
                    </div>
                </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
                <div className="tb-step">
                    <div className="tb-header"><img src={modalLogoImg} alt="logo" /></div>

                    {/* 전체 내용 보기 */}
                    <div className="tb-section">
                        <div className="tb-sh"><span>LED Display 전체 내용 보기</span></div>
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
                            <div className="tb-row"><div className="tb-lbl">첨부파일</div><div className="tb-val" style={{flex:3}}>{formData.attachment}</div></div>

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
                            <div className="tb-row"><div className="tb-lbl">LED 사이즈</div><div className="tb-val" style={{flex:3}}>{formData.ledSizeW}   {formData.ledSizeH}</div></div>
                            <div className="tb-row"><div className="tb-lbl">LED 해상도</div><div className="tb-val" style={{flex:3}}>{formData.ledResolutionW}   {formData.ledResolutionH}</div></div>
                            <div className="tb-row"><div className="tb-lbl">전체 전력</div><div className="tb-val">{formData.totalPower}</div></div>
                            <div className="tb-row">
                                <div className="tb-lbl">프로세스 사양</div><div className="tb-val">{formData.processorModel}</div>
                                <div className="tb-lbl">프로세스 수량</div><div className="tb-val">{formData.processorQuantity}EA</div>
                            </div>
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
                        <div className="tb-sh"><span>LED Display 예상도</span></div>
                        <div className="tb-sb">
                            <div className="tb-preview-border">
                                <div className="tb-preview-layout">
                                    <div className="tb-preview-v"><span>{formData.ledSizeH}mm</span></div>
                                    <div className="tb-grid-container">
                                        {Array.from({length: formData.ledHeight}).map((_,r) => (
                                            <div key={r} className="tb-grid-row">
                                                {Array.from({length: formData.ledWidth}).map((_,c) => (
                                                    <div key={c} className="tb-panel"></div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="tb-preview-h"><span>{formData.ledSizeW}mm</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tb-footer" style={{marginBottom:'40px'}}>
                        <button className="tb-btn-prev" onClick={prevStep}>수정하기</button>
                        <button className="tb-btn-next">견적서 보기</button>
                    </div>

                    {/* 견적서 */}
                    <div className="tb-quote">
                        <div className="tb-quote-header">
                            <div></div>
                            <div className="tb-quote-title">견 적 서</div>
                            <div className="tb-quote-logo"><img src={modalLogoImg} alt="logo" /></div>
                        </div>
                        <div className="tb-quote-date">DATE : {formData.date}</div>

                        <div className="tb-quote-section">
                            <div className="tb-quote-section-title">판매 견적서</div>
                            <table className="tb-ct"><tbody>
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
                                {/* 1. LED */}
                                <tr>
                                    <td rowSpan={2} className="tb-it-center">1</td>
                                    <td rowSpan={2} className="tb-it-product">
                                        <div style={{display:'flex',alignItems:'center',gap:'6px',padding:'4px'}}>
                                            <div style={{fontSize:'10px',fontWeight:'bold'}}>{formData.productName}</div>
                                        </div>
                                    </td>
                                    <td>{formData.productSize}</td>
                                    <td className="tb-it-center">{formData.totalPanels}</td>
                                    <td className="tb-it-right">₩ {fmt(panelPrice)}</td>
                                    <td className="tb-it-right" rowSpan={2}>₩ {fmt(ledTotal)}</td>
                                </tr>
                                <tr>
                                    <td className="tb-it-center">sqm</td>
                                    <td className="tb-it-center">12.96</td>
                                    <td className="tb-it-right">₩ {fmt(sqmPrice)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(ledTotal)}</td>
                                </tr>
                                {/* 2. 프로세서 */}
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">2</td>
                                    <td className="tb-it-product">
                                        <div style={{display:'flex',alignItems:'center',gap:'6px',padding:'4px'}}>
                                            <div style={{fontSize:'10px',fontWeight:'bold'}}>{formData.processorModel}</div>
                                        </div>
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
                                {/* 3. 시공 인건비 */}
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">3</td>
                                    <td className="tb-it-product">시공 인건비</td>
                                    <td className="tb-it-center">인</td>
                                    <td className="tb-it-center">{formData.installWorkers}</td>
                                    <td className="tb-it-right">₩ {fmt(workerPrice)}</td>
                                    <td className="tb-it-right">₩ {fmt(laborTotal)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(laborTotal)}</td>
                                </tr>
                                {/* 4. 기타 재료 비용 외 */}
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">4</td>
                                    <td className="tb-it-product">기타 재료 비용 외</td>
                                    <td className="tb-it-center">EA<br/>기본</td>
                                    <td className="tb-it-center">1<br/>기본</td>
                                    <td className="tb-it-right">₩ {fmt(materialTotal)}</td>
                                    <td className="tb-it-right">₩ {fmt(materialTotal)}</td>
                                </tr>
                                <tr className="tb-it-subtotal">
                                    <td colSpan={4} className="tb-it-center">소계</td>
                                    <td colSpan={2} className="tb-it-right">₩ {fmt(materialTotal)}</td>
                                </tr>
                                {/* 5. 지방 출장비 */}
                                <tr className="tb-it-after-sub">
                                    <td className="tb-it-center">5</td>
                                    <td className="tb-it-product">지방 출장비 [{formData.deliveryLocation}]<br/>(운송비,숙박,기타)</td>
                                    <td className="tb-it-center">지역<br/>기본</td>
                                    <td className="tb-it-center">1<br/>기본</td>
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
                                <tr className="tb-tt-grand">
                                    <td className="tb-tt-label">합 계</td>
                                    <td className="tb-tt-desc"></td>
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
                                <p className="tb-terms-icon">A/S 기간 : 납기일로 부터 2년 무상 (단, 천재지변 및 고객 부주의로 인한 제품 파손 시 비용이 청구 됩니다)</p>
                                <p className="tb-terms-icon">제품의 성능 향상을 위해 제품 스펙은 일부 변경 될 수 있습니다.</p>
                                <p className="tb-terms-icon">입금계좌 : 하나은행 471-910014-06704 예금주 : ㈜이지텍인터내셔널</p>
                            </div>
                            <div className="tb-stamp"><div className="tb-stamp-text">(주)이지텍<br/>인터내셔널</div></div>
                        </div>
                    </div>

                    <div className="tb-footer">
                        <button className="tb-btn-action tb-btn-action--green" onClick={() => setStep(1)}>처음으로</button>
                        <button className="tb-btn-action">메일 보내기</button>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',gap:'40px',padding:'10px 0',fontSize:'14px',color:'#666'}}>
                        <span>1페이지 화면으로</span>
                        <span>LED Display 전체 내용 보기 / 판매견적서 두개 같이 첨부 발송</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TabletEstimateForm
