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
    installLocation: '안양 세마을금고',
    installDetailLocation: '실내 로비',
    etcContent: '',
    
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

  const handleChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
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

  const renderLabelInput = (label, value, onChange, type = 'text', options = null, readOnly = false) => (
    <div className="form-row">
      <div className="form-label">{label}</div>
      <div className="form-input">
        {options ? (
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            type={type} 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  )

  return (
    <div className="estimate-page">
      <div className="main-content-area">
        <div className="left-column">
          {/* 담당자 등록 */}
          <div className="section-card">
            <div className="section-header cyan">
              <span>담당자 등록</span>
              <button className="reset-btn">Reset</button>
            </div>
            <div className="section-body">
              {renderLabelInput('날짜', formData.date, (v) => handleChange('date', v), 'date')}
              <div className="form-row-group">
                {renderLabelInput('담당자', formData.manager, (v) => handleChange('manager', v), 'select', ['기영길', '김철수', '박영희'])}
                {renderLabelInput('부서', formData.department, (v) => handleChange('department', v))}
              </div>
              <div className="form-row-group">
                {renderLabelInput('회사 연락처', formData.companyPhone, (v) => handleChange('companyPhone', v))}
                {renderLabelInput('핸드폰 번호', formData.mobilePhone, (v) => handleChange('mobilePhone', v))}
              </div>
              {renderLabelInput('E-mail', formData.email, (v) => handleChange('email', v))}
              {renderLabelInput('회사 주소', formData.companyAddress, (v) => handleChange('companyAddress', v))}
              <div className="form-row file-row">
                <div className="form-label">첨부파일</div>
                <div className="form-input file-input">
                  <input type="text" value={formData.attachment} readOnly />
                  <button className="attach-btn">첨부하기</button>
                </div>
              </div>
            </div>
          </div>

          {/* 업체 담당자 등록 */}
          <div className="section-card">
            <div className="section-header lime">
              <span>업체 담당자 등록</span>
            </div>
            <div className="section-body">
              {renderLabelInput('기관/업첼명', formData.clientCompany, (v) => handleChange('clientCompany', v))}
              <div className="form-row-group">
                {renderLabelInput('부서명', formData.clientDepartment, (v) => handleChange('clientDepartment', v))}
                {renderLabelInput('업체 담당자', formData.clientManager, (v) => handleChange('clientManager', v))}
              </div>
              <div className="form-row-group">
                {renderLabelInput('회사 연락처', formData.clientPhone, (v) => handleChange('clientPhone', v))}
                {renderLabelInput('핸드폰 번호', formData.clientMobile, (v) => handleChange('clientMobile', v))}
              </div>
              {renderLabelInput('E-mail', formData.clientEmail, (v) => handleChange('clientEmail', v))}
              <div className="form-row file-row">
                <div className="form-label">명함 촬영</div>
                <div className="form-input file-input">
                  <input type="text" value={formData.businessCard} readOnly />
                  <button className="camera-btn">사진찍기</button>
                </div>
              </div>
            </div>
          </div>

          {/* 설치 정보 등록 */}
          <div className="section-card">
            <div className="section-header blue">
              <span>설치 정보 등록</span>
            </div>
            <div className="section-body">
              <div className="form-row-group">
                {renderLabelInput('예상 설치일', formData.installDate, (v) => handleChange('installDate', v), 'date')}
                {renderLabelInput('예상 설치기간', formData.installPeriod, (v) => handleChange('installPeriod', v), 'select',
                  ['1일', '2일', '3일', '4일', '5일', '6일', '7일'])}
              </div>
              <div className="form-row-group">
                {renderLabelInput('설치 장소', formData.installLocation, (v) => handleChange('installLocation', v))}
                {renderLabelInput('세부 장소', formData.installDetailLocation, (v) => handleChange('installDetailLocation', v))}
              </div>
              {renderLabelInput('기타 내용', formData.etcContent, (v) => handleChange('etcContent', v))}
            </div>
          </div>
        </div>

        <div className="right-column">
          {/* LED Display 제품 정보 */}
          <div className="section-card">
            <div className="section-header cyan">
              <span>LED Display 제품 정보</span>
            </div>
            <div className="section-body">
              {renderLabelInput('제품명', formData.productName, (v) => handleChange('productName', v), 'select',
                ['ETK-COB1.2', 'ETK-COB1.5'])}
              <div className="form-row-group">
                {renderLabelInput('제품 사이즈', formData.productSize, () => {}, 'text', null, true)}
                {renderLabelInput('픽셀', formData.pixel, () => {}, 'text', null, true)}
              </div>
              <div className="form-row-group">
                {renderLabelInput('밝기', formData.brightness, () => {}, 'text', null, true)}
                {renderLabelInput('전력', formData.power, () => {}, 'text', null, true)}
              </div>
              {renderLabelInput('해상도', formData.resolution, () => {}, 'text', null, true)}
            </div>
          </div>

          {/* LED Display 구매 수량 */}
          <div className="section-card">
            <div className="section-header cyan">
              <span>LED Display 구매 수량</span>
            </div>
            <div className="section-body">
              <div className="form-row quantity-row">
                <div className="form-label">수량</div>
                <div className="form-input quantity-input">
                  <span className="dim-label">W:</span>
                  <select value={formData.width} onChange={(e) => handleChange('width', e.target.value)}>
                    {Array.from({length: 15}, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <span className="dim-label">X H:</span>
                  <select value={formData.height} onChange={(e) => handleChange('height', e.target.value)}>
                    {Array.from({length: 15}, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <span className="equals">=</span>
                  <input type="text" className="result-field" value={formData.totalPanels} readOnly />
                  <span className="unit">EA</span>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label">LED 사이즈</div>
                  <div className="form-input split-input">
                    <input type="text" value={formData.ledSizeW} readOnly />
                    <span className="x-mark">X</span>
                    <input type="text" value={formData.ledSizeH} readOnly />
                  </div>
                </div>
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <div className="form-label">LED 해상도</div>
                  <div className="form-input split-input">
                    <input type="text" value={formData.ledResW} readOnly />
                    <span className="x-mark">X</span>
                    <input type="text" value={formData.ledResH} readOnly />
                  </div>
                </div>
              </div>
              <div className="form-row-group">
                {renderLabelInput('전체 전력', formData.totalPower + ' Kw', () => {}, 'text', null, true)}
                {renderLabelInput('설치인원', formData.installPersonnel, (v) => handleChange('installPersonnel', v), 'select',
                  [1,2,3,4,5,6,7,8,9,10])}
              </div>
              <div className="form-row-group">
                {renderLabelInput('프로세스 사양', formData.processorModel, (v) => handleChange('processorModel', v), 'select',
                  ['VX400', 'VX600', 'VX1000', 'VX2000'])}
                {renderLabelInput('수량', formData.processorQuantity, (v) => handleChange('processorQuantity', v), 'select',
                  [1,2,3,4,5,6,7,8,9,10])}
              </div>
            </div>
          </div>

          {/* LED Display 예상도 */}
          <div className="section-card">
            <div className="section-header cyan">
              <span>LED Display 예상도</span>
            </div>
            <div className="section-body preview-body">
              <div className="led-preview-container">
                <div className="led-dimension-v">{formData.ledSizeH}mm</div>
                <div className="led-grid-wrapper">
                  <div className="led-grid" style={{
                    gridTemplateColumns: `repeat(${formData.width}, 1fr)`,
                    gridTemplateRows: `repeat(${formData.height}, 1fr)`
                  }}>
                    {Array.from({length: formData.totalPanels}).map((_, i) => (
                      <div key={i} className="led-panel"></div>
                    ))}
                  </div>
                  <div className="led-dimension-h">{formData.ledSizeW}mm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-actions">
        <button className="btn-view-saved">저장 내용 보기</button>
        <button className="btn-view-quote">견적서 보기</button>
      </div>
    </div>
  )
}

export default EstimateForm
