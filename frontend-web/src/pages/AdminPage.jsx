import { useState } from 'react'
import './AdminPage.css'

function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  
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
      <h2>견적 관리</h2>
      <div className="search-bar">
        <input type="text" placeholder="견적번호 또는 고객명 검색" />
        <button className="btn-cyan">검색</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>견적번호</th>
            <th>날짜</th>
            <th>고객명</th>
            <th>담당자</th>
            <th>금액</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map(est => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.date}</td>
              <td>{est.customer}</td>
              <td>{est.manager}</td>
              <td>₩ {est.amount.toLocaleString()}</td>
              <td><span className={`status-badge ${est.status}`}>{est.status}</span></td>
              <td>
                <button className="btn-small btn-cyan">상세</button>
                <button className="btn-small btn-danger">삭제</button>
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
          <button className="btn-cyan">+ 제품 추가</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>제품명</th>
              <th>사이즈</th>
              <th>픽셀</th>
              <th>밝기</th>
              <th>전력</th>
              <th>단가</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.size}</td>
                <td>{prod.pixel}</td>
                <td>{prod.brightness}</td>
                <td>{prod.power}</td>
                <td>₩ {prod.price.toLocaleString()}</td>
                <td>
                  <button className="btn-small btn-cyan">수정</button>
                  <button className="btn-small btn-danger">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-section">
        <div className="section-title-bar">
          <h3>VX 프로세서</h3>
          <button className="btn-cyan">+ 프로세서 추가</button>
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
                  <button className="btn-small btn-cyan">수정</button>
                  <button className="btn-small btn-danger">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderPricing = () => (
    <div className="admin-section">
      <h2>단가 관리</h2>
      
      <div className="pricing-card">
        <h3>LED 단가</h3>
        <div className="pricing-row">
          <label>ETK-COB1.2</label>
          <input type="number" defaultValue={950000} />
          <span>원</span>
        </div>
        <div className="pricing-row">
          <label>ETK-COB1.5</label>
          <input type="number" defaultValue={850000} />
          <span>원</span>
        </div>
      </div>

      <div className="pricing-card">
        <h3>VX 프로세서 단가</h3>
        <div className="pricing-row">
          <label>VX400</label>
          <input type="number" defaultValue={2000000} />
          <span>원</span>
        </div>
        <div className="pricing-row">
          <label>VX600</label>
          <input type="number" defaultValue={3000000} />
          <span>원</span>
        </div>
        <div className="pricing-row">
          <label>VX1000</label>
          <input type="number" defaultValue={5000000} />
          <span>원</span>
        </div>
        <div className="pricing-row">
          <label>VX2000</label>
          <input type="number" defaultValue={8000000} />
          <span>원</span>
        </div>
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

  return (
    <div className="admin-page">
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
            견적 관리
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            제품 관리
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
        </nav>
      </aside>

      <main className="admin-content">
        <div className="admin-inner">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'estimates' && renderEstimates()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'pricing' && renderPricing()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </main>
    </div>
  )
}

export default AdminPage
