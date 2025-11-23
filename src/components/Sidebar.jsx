import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-circle"></div>
        <h2>Task Manager</h2>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">メニュー</p>
        <div className="sidebar-item" onClick={() => navigate('/tasks')}>
          全タスク
        </div>
        <div
          className="sidebar-item"
          onClick={() => navigate('/tasks?filter=progress')}
        >
          進行中
        </div>
        <div
          className="sidebar-item"
          onClick={() => navigate('/tasks?filter=done')}
        >
          完了済み
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">ビュー</p>
        <div className="sidebar-item" onClick={() => navigate('/gantt')}>
          ガントチャート
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">カテゴリ</p>
        <div className="sidebar-item">デザイン</div>
        <div className="sidebar-item">勉強</div>
        <div className="sidebar-item">開発</div>
        <div className="sidebar-item">その他</div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-item">設定</div>
      </div>
    </div>
  );
}
