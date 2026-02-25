import { useState } from 'react'
import './EstimateForm.css'
import './TabletEstimateForm.css'
import modalLogoImg from '../assets/modal-logo2.png'

function TabletEstimateForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        // 담당자 정보
        date: new Date().toISOString().split('T')[0],
        managerName: '',
        department: '',
        managerPhone: '',
        managerMobile: '',
        managerEmail: '',
        companyAddress: '',
        attachment: '',
        
        // 업체 담당자 정보
        clientName: '',
        clientDepartment: '',
        clientManager: '',
        clientPhone: '',
        clientMobile: '',
        clientEmail: '',
        businessCard: '',
        
        // 설치 정보
        installDate: '',
        installPeriod: '2일',
        installLocation: '',
        installDetail: '',
        installNote: '',
        
        // 제품 정보
        productName: 'ETK-COB1.2',
        productSize: '600x337.5',
        pixel: '1.2 Pixel',
        brightness: '800 Nit',
        power: '75/25 W',
        resolution: '490x270 Dpi',
        
        // 구매 수량
        ledWidth: 7,
        ledHeight: 6,
        ledSizeW: 4200,
        ledSizeH: 2025,
        ledResolutionW: 3360,
        ledResolutionH: 1620,
        totalPower: '427 W',
        processorModel: 'VX600 Pro',
        processorQuantity: 1,
        totalPanels: 42
    })

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        if (step < 3) setStep(step + 1)
    }

    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }

    return (
        <div className="tablet-container">
            {/* Step 1: 담당자 및 설치 정보 입력 */}
            {step === 1 && (
                <div className="tablet-step">
                    {/* 로고 */}
                    <div className="tablet-header">
                        <img src={modalLogoImg} alt="logo" style={{height: '60px'}} />
                    </div>

                    {/* 담당자 등록 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>담당자 등록</span>
                            <button className="btn-reset">Reset</button>
                        </div>
                        <div className="section-body">
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>날짜</div>
                                <div className="form-input">
                                    <input type="date" value={formData.date} 
                                           onChange={(e) => handleChange('date', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>담당자</div>
                                <div className="form-input">
                                    <input type="text" value={formData.managerName}
                                           onChange={(e) => handleChange('managerName', e.target.value)} />
                                </div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>부서</div>
                                <div className="form-input">
                                    <input type="text" value={formData.department}
                                           onChange={(e) => handleChange('department', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>회사 연락처</div>
                                <div className="form-input">
                                    <input type="text" value={formData.managerPhone}
                                           onChange={(e) => handleChange('managerPhone', e.target.value)} />
                                </div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>핸드폰 번호</div>
                                <div className="form-input">
                                    <input type="text" value={formData.managerMobile}
                                           onChange={(e) => handleChange('managerMobile', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>E-mail</div>
                                <div className="form-input" style={{flex: 3}}>
                                    <input type="email" value={formData.managerEmail}
                                           onChange={(e) => handleChange('managerEmail', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>회사 주소</div>
                                <div className="form-input" style={{flex: 3}}>
                                    <input type="text" value={formData.companyAddress}
                                           onChange={(e) => handleChange('companyAddress', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>첨부파일</div>
                                <div className="form-input" style={{flex: 2}}>
                                    <input type="text" value={formData.attachment}
                                           onChange={(e) => handleChange('attachment', e.target.value)} />
                                </div>
                                <button className="btn-action cyan">첨부하기</button>
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
                                <div className="form-label" style={{background: '#8CC63F', color: 'white'}}>기관/업체명</div>
                                <div className="form-input" style={{flex: 3}}>
                                    <input type="text" value={formData.clientName}
                                           onChange={(e) => handleChange('clientName', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#8CC63F', color: 'white'}}>부서명</div>
                                <div className="form-input">
                                    <input type="text" value={formData.clientDepartment}
                                           onChange={(e) => handleChange('clientDepartment', e.target.value)} />
                                </div>
                                <div className="form-label" style={{background: '#8CC63F', color: 'white'}}>업체 담당자</div>
                                <div className="form-input">
                                    <input type="text" value={formData.clientManager}
                                           onChange={(e) => handleChange('clientManager', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#8CC63F', color: 'white'}}>회사 연락처</div>
                                <div className="form-input">
                                    <input type="text" value={formData.clientPhone}
                                           onChange={(e) => handleChange('clientPhone', e.target.value)} />
                                </div>
                                <div className="form-label" style={{background: '#8CC63F', color: 'white'}}>핸드폰 번호</div>
                                <div className="form-input">
                                    <input type="text" value={formData.clientMobile}
                                           onChange={(e) => handleChange('clientMobile', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#8CC63F', color: 'white'}}>E-mail</div>
                                <div className="form-input" style={{flex: 3}}>
                                    <input type="email" value={formData.clientEmail}
                                           onChange={(e) => handleChange('clientEmail', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#8CC63F', color: 'white'}}>명함 촬영</div>
                                <div className="form-input" style={{flex: 2}}>
                                    <input type="text" value={formData.businessCard}
                                           onChange={(e) => handleChange('businessCard', e.target.value)} />
                                </div>
                                <button className="btn-action green">사진찍기</button>
                            </div>
                        </div>
                    </div>

                    {/* 설치 정보 등록 */}
                    <div className="section-card border-blue">
                        <div className="section-header blue">
                            <span>설치 정보 등록</span>
                        </div>
                        <div className="section-body">
                            <div className="form-row">
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>예상 설치날짜</div>
                                <div className="form-input">
                                    <input type="date" value={formData.installDate}
                                           onChange={(e) => handleChange('installDate', e.target.value)} />
                                </div>
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>예상 설치기간</div>
                                <div className="form-input">
                                    <select value={formData.installPeriod}
                                            onChange={(e) => handleChange('installPeriod', e.target.value)}>
                                        <option>2일</option>
                                        <option>3일</option>
                                        <option>4일</option>
                                        <option>5일</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>설치 장소</div>
                                <div className="form-input">
                                    <input type="text" value={formData.installLocation}
                                           onChange={(e) => handleChange('installLocation', e.target.value)} />
                                </div>
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>세부 장소</div>
                                <div className="form-input">
                                    <input type="text" value={formData.installDetail}
                                           onChange={(e) => handleChange('installDetail', e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>기타 내용</div>
                                <div className="form-input" style={{flex: 3}}>
                                    <input type="text" value={formData.installNote}
                                           onChange={(e) => handleChange('installNote', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tablet-footer">
                        <button className="btn-next cyan" onClick={nextStep}>다음</button>
                    </div>
                </div>
            )}

            {/* Step 2: 제품 정보 및 구매 수량 */}
            {step === 2 && (
                <div className="tablet-step">
                    <div className="tablet-header">
                        <img src={modalLogoImg} alt="logo" style={{height: '60px'}} />
                    </div>

                    {/* LED Display 제품 정보 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>LED Display 제품 정보</span>
                        </div>
                        <div className="section-body">
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>제품명</div>
                                <div className="form-input">
                                    <select value={formData.productName}
                                            onChange={(e) => handleChange('productName', e.target.value)}>
                                        <option>ETK-COB1.2</option>
                                        <option>ETK-COB1.5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>제품 사이즈</div>
                                <div className="form-input">
                                    <input type="text" value={formData.productSize} readOnly />
                                </div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>픽셀</div>
                                <div className="form-input">
                                    <input type="text" value={formData.pixel} readOnly />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>밝기</div>
                                <div className="form-input">
                                    <input type="text" value={formData.brightness} readOnly />
                                </div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>전력</div>
                                <div className="form-input">
                                    <input type="text" value={formData.power} readOnly />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>해상도</div>
                                <div className="form-input" style={{flex: 3}}>
                                    <input type="text" value={formData.resolution} readOnly />
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
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>수량</div>
                                <div className="form-input">
                                    W: <input type="number" value={formData.ledWidth} style={{width: '80px'}}
                                              onChange={(e) => handleChange('ledWidth', e.target.value)} />
                                </div>
                                <div className="form-input">
                                    X H: <input type="number" value={formData.ledHeight} style={{width: '80px'}}
                                                onChange={(e) => handleChange('ledHeight', e.target.value)} />
                                </div>
                                <div className="form-input">
                                    = {formData.totalPanels} EA
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>LED 사이즈</div>
                                <div className="form-input">
                                    <input type="text" value={formData.ledSizeW} readOnly />
                                </div>
                                <div className="form-input">
                                    X <input type="text" value={formData.ledSizeH} readOnly />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>LED 해상도</div>
                                <div className="form-input">
                                    <input type="text" value={formData.ledResolutionW} readOnly />
                                </div>
                                <div className="form-input">
                                    X <input type="text" value={formData.ledResolutionH} readOnly />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>전체 전력</div>
                                <div className="form-input">
                                    <input type="text" value={formData.totalPower} readOnly />
                                </div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>설치인원</div>
                                <div className="form-input">
                                    <select>
                                        <option>3명</option>
                                        <option>4명</option>
                                        <option>5명</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>프로세서 사양</div>
                                <div className="form-input">
                                    <select value={formData.processorModel}
                                            onChange={(e) => handleChange('processorModel', e.target.value)}>
                                        <option>VX600 Pro</option>
                                        <option>VX1000 Pro</option>
                                    </select>
                                </div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>수량</div>
                                <div className="form-input">
                                    <select value={formData.processorQuantity}
                                            onChange={(e) => handleChange('processorQuantity', e.target.value)}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LED Display 예상도 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>LED Display 예상도</span>
                        </div>
                        <div className="section-body">
                            <div className="led-preview-border">
                                <div className="led-preview-layout">
                                    <div className="led-dimension-v">
                                        <span>{formData.ledSizeH}mm</span>
                                    </div>
                                    <div className="led-grid-container">
                                        {Array.from({length: formData.ledHeight}).map((_, row) => (
                                            <div key={row} className="led-grid-row">
                                                {Array.from({length: formData.ledWidth}).map((_, col) => (
                                                    <div key={col} className="led-panel"></div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="led-dimension-h">
                                        <span>{formData.ledSizeW}mm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tablet-footer">
                        <button className="btn-prev" onClick={prevStep}>이전</button>
                        <button className="btn-next cyan" onClick={nextStep}>전체 내용 보기</button>
                    </div>
                </div>
            )}

            {/* Step 3: 전체 내용 보기 + 견적서 */}
            {step === 3 && (
                <div className="tablet-step">
                    <div className="tablet-header">
                        <img src={modalLogoImg} alt="logo" style={{height: '60px'}} />
                    </div>

                    {/* 전체 내용 보기 */}
                    <div className="section-card border-cyan">
                        <div className="section-header cyan">
                            <span>LED Display 전체 내용 보기</span>
                        </div>
                        <div className="section-body">
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>날짜</div>
                                <div className="form-value">{formData.date}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>담당자</div>
                                <div className="form-value">{formData.managerName}</div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>부서</div>
                                <div className="form-value">{formData.department}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>회사 연락처</div>
                                <div className="form-value">{formData.managerPhone}</div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>핸드폰 번호</div>
                                <div className="form-value">{formData.managerMobile}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>E-mail</div>
                                <div className="form-value" style={{flex: 3}}>{formData.managerEmail}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>회사 주소</div>
                                <div className="form-value" style={{flex: 3}}>{formData.companyAddress}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>첨부파일</div>
                                <div className="form-value" style={{flex: 3}}>{formData.attachment}</div>
                            </div>
                            
                            <div style={{height: '20px', borderTop: '2px dashed #3BC1CC', margin: '20px 0'}}></div>
                            
                            <div className="form-row">
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>예상 설치날짜</div>
                                <div className="form-value">{formData.installDate}</div>
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>예상 설치기간</div>
                                <div className="form-value">{formData.installPeriod}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>설치 장소</div>
                                <div className="form-value">{formData.installLocation}</div>
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>세부 장소</div>
                                <div className="form-value">{formData.installDetail}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#2196F3', color: 'white'}}>기타 내용</div>
                                <div className="form-value" style={{flex: 3}}>{formData.installNote}</div>
                            </div>
                            
                            <div style={{height: '20px', borderTop: '2px dashed #3BC1CC', margin: '20px 0'}}></div>
                            
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>제품명</div>
                                <div className="form-value" style={{flex: 3}}>{formData.productName}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>제품 사이즈</div>
                                <div className="form-value">{formData.productSize}</div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>픽셀</div>
                                <div className="form-value">{formData.pixel}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>밝기</div>
                                <div className="form-value">{formData.brightness}</div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>전력</div>
                                <div className="form-value">{formData.power}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>해상도</div>
                                <div className="form-value" style={{flex: 3}}>{formData.resolution}</div>
                            </div>
                            
                            <div style={{height: '20px', borderTop: '2px dashed #3BC1CC', margin: '20px 0'}}></div>
                            
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>수량</div>
                                <div className="form-value" style={{flex: 3}}>W : {formData.ledWidth}  X  H : {formData.ledHeight}  =  {formData.totalPanels}EA</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>LED 사이즈</div>
                                <div className="form-value" style={{flex: 3}}>{formData.ledSizeW} x {formData.ledSizeH}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>LED 해상도</div>
                                <div className="form-value" style={{flex: 3}}>{formData.ledResolutionW} x {formData.ledResolutionH}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>전체 전력</div>
                                <div className="form-value">{formData.totalPower}</div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>설치인원</div>
                                <div className="form-value">3명</div>
                            </div>
                            <div className="form-row">
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>프로세서 사양</div>
                                <div className="form-value">{formData.processorModel}</div>
                                <div className="form-label" style={{background: '#3BC1CC', color: 'white'}}>수량</div>
                                <div className="form-value">{formData.processorQuantity}</div>
                            </div>
                        </div>
                    </div>

                    {/* 견적서 */}
                    <div className="quote-outer" style={{border: 'none', padding: 0}}>
                        <div className="quote-header">
                            <div style={{width: '60px'}}></div>
                            <div className="quote-title-text">견 적 서</div>
                            <div className="quote-header-logo">
                                <img src={modalLogoImg} alt="logo" style={{height: '56px', imageRendering: 'crisp-edges'}}/>
                            </div>
                        </div>

                        <div className="quote-date">DATE : {formData.date}</div>

                        <div className="section">
                            <div className="quote-section-title">판매 견적서</div>

                            <table className="quote-client-table">
                                <tbody>
                                <tr>
                                    <td className="qct-label">기관/업체명</td>
                                    <td className="qct-value" colSpan={3}>{formData.clientName}</td>
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
                                <tr style={{borderTop: 'none'}}>
                                    <td rowSpan={2} className="qi-center">1</td>
                                    <td rowSpan={2} className="qi-product">
                                        <div style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '4px'}}>
                                            <img src="https://via.placeholder.com/60x45" alt="product" style={{width: '60px', height: '45px', objectFit: 'cover'}} />
                                            <div style={{fontSize: '10px', fontWeight: 'bold'}}>{formData.productName}</div>
                                        </div>
                                    </td>
                                    <td>{formData.productSize}</td>
                                    <td className="qi-center">{formData.totalPanels}</td>
                                    <td className="qi-right">₩<br/>950,000</td>
                                    <td className="qi-right" rowSpan={2}>₩<br/>{(950000 * formData.totalPanels).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "center"}}>sqm</td>
                                    <td className="qi-center">9.92</td>
                                    <td className="qi-right">₩      4,691,358</td>
                                </tr>
                                <tr className="qi-subtotal">
                                    <td colSpan={4} className="qi-center">소계</td>
                                    <td colSpan={2} className="qi-right">₩      {(950000 * formData.totalPanels).toLocaleString()}</td>
                                </tr>
                                <tr className="qi-item-after-subtotal">
                                    <td className="qi-center">2</td>
                                    <td className="qi-product">
                                        <div style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '4px'}}>
                                            <img src="https://via.placeholder.com/60x45" alt="processor" style={{width: '60px', height: '45px', objectFit: 'cover'}} />
                                            <div style={{fontSize: '10px', fontWeight: 'bold'}}>{formData.processorModel}</div>
                                        </div>
                                    </td>
                                    <td>—</td>
                                    <td className="qi-center">{formData.processorQuantity}</td>
                                    <td className="qi-right">₩<br/>3,000,000</td>
                                    <td className="qi-right">₩<br/>{(3000000 * formData.processorQuantity).toLocaleString()}</td>
                                </tr>
                                <tr className="qi-subtotal">
                                    <td colSpan={4} className="qi-center">소계</td>
                                    <td colSpan={2} className="qi-right">₩      {(3000000 * formData.processorQuantity).toLocaleString()}</td>
                                </tr>
                                <tr className="qi-item-after-subtotal">
                                    <td className="qi-center">3</td>
                                    <td className="qi-product">시공 인건비</td>
                                    <td>인</td>
                                    <td className="qi-center">7</td>
                                    <td className="qi-right">₩<br/>300,000</td>
                                    <td className="qi-right">₩<br/>2,100,000</td>
                                </tr>
                                <tr className="qi-subtotal">
                                    <td colSpan={4} className="qi-center">소계</td>
                                    <td colSpan={2} className="qi-right">₩      2,100,000</td>
                                </tr>
                                <tr className="qi-item-after-subtotal">
                                    <td className="qi-center">4</td>
                                    <td className="qi-product">기타 비용</td>
                                    <td>—</td>
                                    <td className="qi-center">2</td>
                                    <td className="qi-right">₩<br/>100,000</td>
                                    <td className="qi-right">₩<br/>200,000</td>
                                </tr>
                                <tr className="qi-subtotal">
                                    <td colSpan={4} className="qi-center">소계</td>
                                    <td colSpan={2} className="qi-right">₩      200,000</td>
                                </tr>
                                </tbody>
                            </table>

                            <div className="quote-note">
                                *설치 구조물 / UTP케이블 적업 / 전기 공사 비용은 현장상황 이후 추정 됩니다.
                            </div>

                            <table className="quote-total-table">
                                <tbody>
                                <tr className="qt-item">
                                    <td className="qt-label">판매</td>
                                    <td className="qt-desc">LED 디스플레이 판매가 (1+2)</td>
                                    <td className="qt-unit">₩</td>
                                    <td className="qt-amount">49,550,000</td>
                                </tr>
                                <tr className="qt-item">
                                    <td className="qt-label">추가</td>
                                    <td className="qt-desc">시공비 + 기타 비용</td>
                                    <td className="qt-unit">₩</td>
                                    <td className="qt-amount">2,200,000</td>
                                </tr>
                                <tr className="qt-grand">
                                    <td className="qt-label">합 계</td>
                                    <td className="qt-desc"></td>
                                    <td className="qt-unit">₩</td>
                                    <td className="qt-amount">49,550,000</td>
                                </tr>
                                </tbody>
                            </table>
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
                            <div className="quote-stamp">
                                <div className="quote-stamp-text">(주)이지텍인터내셔널</div>
                            </div>
                        </div>
                    </div>

                    <div className="tablet-footer">
                        <button className="btn-prev" onClick={prevStep}>이전</button>
                        <button className="btn-action green" onClick={() => setStep(1)}>처음으로</button>
                        <button className="btn-action cyan">메일 보내기</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TabletEstimateForm
