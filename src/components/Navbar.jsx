import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/tasks')}>
        <div className="navbar-logo-circle" />
        <h1>Task Manager</h1>
      </div>
      <div className="navbar-right">
        <button className="btn" onClick={() => navigate('/add')}>
          + タスク追加
        </button>
      </div>
    </nav>
  );
}
