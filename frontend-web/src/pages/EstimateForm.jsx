import { useState } from 'react'
import './EstimateForm.css'

function EstimateForm() {
  const [formData, setFormData] = useState({
    date: '2026.01.28',
    manager: '기영길',
    department: '기획팀',
    companyPhone: '02-6258-1600',
    mobilePhone: '010-1234-5678',
    email: 'adcde@aaaa.co.kr',
    companyAddress: '경기도 남양주시 화도읍 재재기로 190번길 32 이지빌리지타워',
    attachment: '이지텍인터내셔널 e_브로슈어.pdf',
    clientCompany: '갈더마코리아',
    clientDepartment: '영업부',
    clientManager: '홍길동',
    clientPhone: '02-1111-3333',
    clientMobile: '010-1234-5678',
    clientEmail: 'adcde@aaaa.co.kr',
    businessCard: 'asdasd.jpg',
    installDate: '2026.01.28',
    installPeriod: '2일',
    installLocation: '안양 새마을금고',
    installDetailLocation: '실내 로비',
    etcContent: '———',
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
    processorQuantity: 1
  })

  const productSpecs = {
    'ETK-COB1.2': { size: '600x337.5', pixel: '1.2 Pixel', brightness: '800 Nit', power: '75/25 W', resolution: '480x270 Dpi', altPixel: '1.5 Pixel', altPower: '70/25 W', altRes: '384x216 Dpi' },
    'ETK-COB1.5': { size: '600x337.5', pixel: '1.5 Pixel', brightness: '800 Nit', power: '70/25 W', resolution: '384x216 Dpi', altPixel: '1.2 Pixel', altPower: '75/25 W', altRes: '480x270 Dpi' }
  }

  const handleChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      if (field === 'productName' && productSpecs[value]) {
        const spec = productSpecs[value]
        newData.productSize = spec.size
        newData.pixel = spec.pixel
        newData.brightness = spec.brightness
        newData.power = spec.power
        newData.resolution = spec.resolution
      }
      if (field === 'width' || field === 'height') {
        const w = field === 'width' ? parseInt(value) || 0 : prev.width
        const h = field === 'height' ? parseInt(value) || 0 : prev.height
        newData.totalPanels = w * h
        newData.ledSizeW = w * 600
        newData.ledSizeH = Math.round(h * 337.5)
        newData.ledResW = w * 480
        newData.ledResH = h * 270
        newData.totalPower = Math.round((w * h * 75 / 1000) * 10) / 10
      }
      return newData
    })
  }

  const currentSpec = productSpecs[formData.productName]
  const labelCyan = { backgroundColor: '#25CAD2' }
  const labelGreen = { backgroundColor: '#8cc63f' }
  const labelBlue = { backgroundColor: '#0071BC' }

  return (
    <div className="estimate-page">
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
                  <input type="text" value={formData.date} onChange={(e) => handleChange('date', e.target.value)} style={{paddingRight: '35px'}} />
                  <input type="date" onChange={(e) => handleChange('date', e.target.value.replace(/-/g, '.'))} style={{position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', opacity: 0, cursor: 'pointer'}} />
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
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
                    <select value={formData.manager} onChange={(e) => handleChange('manager', e.target.value)}>
                      <option>기영길</option><option>김철수</option><option>박영희</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>부서</div>
                  <div className="form-input">
                    <input type="text" value={formData.department} onChange={(e) => handleChange('department', e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>회사 연락처</div>
                  <div className="form-input">
                    <input type="text" value={formData.companyPhone} onChange={(e) => handleChange('companyPhone', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>핸드폰 번호</div>
                  <div className="form-input">
                    <input type="text" value={formData.mobilePhone} onChange={(e) => handleChange('mobilePhone', e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-label" style={labelCyan}>E-mail</div>
                <div className="form-input">
                  <input type="text" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-label" style={labelCyan}>회사 주소</div>
                <div className="form-input">
                  <input type="text" value={formData.companyAddress} onChange={(e) => handleChange('companyAddress', e.target.value)} />
                </div>
              </div>
              <div className="form-row file-row">
                <div className="form-label" style={labelCyan}>첨부파일</div>
                <div className="form-input file-input">
                  <input type="text" value={formData.attachment} readOnly />
                  <button className="attach-btn">첨부하기</button>
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
                  <input type="text" value={formData.clientCompany} onChange={(e) => handleChange('clientCompany', e.target.value)} />
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelGreen}>부서명</div>
                  <div className="form-input">
                    <input type="text" value={formData.clientDepartment} onChange={(e) => handleChange('clientDepartment', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelGreen}>업체 담당자</div>
                  <div className="form-input">
                    <input type="text" value={formData.clientManager} onChange={(e) => handleChange('clientManager', e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelGreen}>회사 연락처</div>
                  <div className="form-input">
                    <input type="text" value={formData.clientPhone} onChange={(e) => handleChange('clientPhone', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelGreen}>핸드폰 번호</div>
                  <div className="form-input">
                    <input type="text" value={formData.clientMobile} onChange={(e) => handleChange('clientMobile', e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-label" style={labelGreen}>E-mail</div>
                <div className="form-input">
                  <input type="text" value={formData.clientEmail} onChange={(e) => handleChange('clientEmail', e.target.value)} />
                </div>
              </div>
              <div className="form-row file-row">
                <div className="form-label" style={labelGreen}>명함 촬영</div>
                <div className="form-input file-input">
                  <input type="text" value={formData.businessCard} readOnly />
                  <button className="camera-btn" style={{backgroundColor: '#8cc63f'}}>사진찍기</button>
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
                  <div className="form-input">
                    <input type="text" value={formData.installDate} onChange={(e) => handleChange('installDate', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelBlue}>예상 설치기간</div>
                  <div className="form-input">
                    <select value={formData.installPeriod} onChange={(e) => handleChange('installPeriod', e.target.value)}>
                      {['1일','2일','3일','4일','5일','6일','7일'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelBlue}>설치 장소</div>
                  <div className="form-input">
                    <input type="text" value={formData.installLocation} onChange={(e) => handleChange('installLocation', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelBlue}>세부 장소</div>
                  <div className="form-input">
                    <input type="text" value={formData.installDetailLocation} onChange={(e) => handleChange('installDetailLocation', e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-label" style={labelBlue}>기타 내용</div>
                <div className="form-input">
                  <input type="text" value={formData.etcContent} onChange={(e) => handleChange('etcContent', e.target.value)} />
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
                <div className="form-input" style={{maxWidth: '37.2%'}}>
                  <select value={formData.productName} onChange={(e) => handleChange('productName', e.target.value)}>
                    <option>ETK-COB1.2</option><option>ETK-COB1.5</option>
                  </select>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>제품 사이즈</div>
                  <div className="form-input">
                    <input type="text" value={formData.productSize} readOnly />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>픽셀</div>
                  <div className="form-input">
                    <div style={{padding: '6px 10px', background: '#f5f5f5', borderRadius: '4px', width: '100%'}}>
                      {formData.pixel}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>밝기</div>
                  <div className="form-input">
                    <input type="text" value={formData.brightness} readOnly />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>전력</div>
                  <div className="form-input">
                    <div style={{padding: '6px 10px', background: '#f5f5f5', borderRadius: '4px', width: '100%'}}>
                      {formData.power}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-label" style={labelCyan}>해상도</div>
                <div className="form-input" style={{maxWidth: '37.2%'}}>
                  <div style={{padding: '6px 10px', background: '#f5f5f5', borderRadius: '4px', width: '100%'}}>
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
                  <select value={formData.width} onChange={(e) => handleChange('width', e.target.value)}>
                    {Array.from({length: 15}, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="quantity-range">1 ~ 15</span>
                  <span className="dim-label">X H:</span>
                  <select value={formData.height} onChange={(e) => handleChange('height', e.target.value)}>
                    {Array.from({length: 15}, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="quantity-range">1 ~ 15</span>
                  <span className="equals">=</span>
                  <input type="text" className="result-field" value={formData.totalPanels} readOnly />
                  <span className="unit">EA</span>
                </div>
              </div>
              <div className="form-row">
                <div className="form-label" style={labelCyan}>LED 사이즈</div>
                <div className="split-input">
                  <input type="text" value={formData.ledSizeW} readOnly />
                  <span className="x-mark">X</span>
                  <input type="text" value={formData.ledSizeH} readOnly />
                </div>
              </div>
              <div className="form-row">
                <div className="form-label" style={labelCyan}>LED 해상도</div>
                <div className="split-input">
                  <input type="text" value={formData.ledResW} readOnly />
                  <span className="x-mark">X</span>
                  <input type="text" value={formData.ledResH} readOnly />
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>전체 전력</div>
                  <div className="form-input">
                    <input type="text" value={formData.totalPower + ' Kw'} readOnly />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>설치인원</div>
                  <div className="form-input">
                    <select value={formData.installPersonnel} onChange={(e) => handleChange('installPersonnel', e.target.value)}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}명</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>프로세스 사양</div>
                  <div className="form-input">
                    <select value={formData.processorModel} onChange={(e) => handleChange('processorModel', e.target.value)}>
                      <option>VX400</option><option>VX600</option><option>VX600 Pro</option><option>VX1000</option><option>VX2000</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-label" style={labelCyan}>수량</div>
                  <div className="form-input">
                    <select value={formData.processorQuantity} onChange={(e) => handleChange('processorQuantity', e.target.value)}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
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
              <div className="led-preview-border">
                <div className="led-preview-layout">
                  <div className="led-dimension-v">
                    <div className="led-dimension-v-line">
                      <span className="led-dimension-v-text">{formData.ledSizeH}mm</span>
                    </div>
                  </div>
                  <div className="led-grid-wrapper">
                    <div className="led-grid" style={{
                      gridTemplateColumns: `repeat(${formData.width}, 1fr)`,
                      gridTemplateRows: `repeat(${formData.height}, 1fr)`
                    }}>
                      {Array.from({length: formData.totalPanels}).map((_, i) => (
                        <div key={i} className="led-panel"></div>
                      ))}
                    </div>
                    <div className="led-dimension-h">
                      <div className="led-dimension-h-line">
                        <span className="led-dimension-h-text">{formData.ledSizeW}mm</span>
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
        <button className="btn-view-saved">전체 내용 보기</button>
        <button className="btn-view-quote">견적서 보기</button>
      </div>
    </div>
  )
}

export default EstimateForm
