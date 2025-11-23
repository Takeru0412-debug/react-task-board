import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTasks, saveTasks } from '../data/tasks.js';
import Navbar from '../components/Navbar.jsx';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task,setTask]=useState(null);
  const [title,setTitle]=useState('');
  const [progress,setProgress]=useState(0);
  const [dueDate,setDueDate]=useState('');

  useEffect(()=>{
    const t = getTasks().find(t=>t.id===id);
    if(!t){ navigate('/tasks'); return; }
    setTask(t); setTitle(t.title); setProgress(t.progress); setDueDate(t.dueDate||'');
  },[id,navigate]);

  const saveEdit=(e)=>{
    e.preventDefault();
    const updated = getTasks().map(t=>t.id===id?{...t, title, progress:Number(progress), dueDate:dueDate||null}:t);
    saveTasks(updated);
    navigate(`/tasks/${id}`);
  };

  if(!task) return <div className="loading">読み込み中...</div>;

  return (
    <main>
      <form onSubmit={saveEdit} className="form-container">
        <h2>タスク編集</h2>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input type="number" value={progress} onChange={e=>setProgress(e.target.value)} min="0" max="100" required />
        <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        <div className="button-group">
          <button type="button" className="btn btn-red" onClick={()=>navigate(`/tasks/${id}`)}>キャンセル</button>
          <button type="submit" className="btn btn-green">保存</button>
        </div>
      </form>
    </main>
  );
}
