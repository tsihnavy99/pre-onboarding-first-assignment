import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { MdOutlineArrowBackIos } from 'react-icons/md';

const IssueDetail = () => {
  const issue = useLocation().state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <div className="issue-detail">
      <div className="header">
        <img className="user-img" src={issue.user.avatar_url} alt="작성자 프로필 이미지" />
        <div className="info-container">
          <div className="title-container">
            <span className="title">#{issue.number} {issue.title}</span>
            <p className="info">작성자: {issue.user.login}, 작성일: {new Intl.DateTimeFormat('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(issue.created_at))}</p>
          </div>
          <div className="comment">
            <span>코멘트: {issue.comments}</span>
          </div>
        </div>
      </div>
      <div className="body">
        <Markdown remarkPlugins={[remarkGfm]}>{issue.body}</Markdown>
      </div>
      <Link to='/' className="go-back-btn">
        <MdOutlineArrowBackIos size={26} className="go-back-btn back1"/>
        <MdOutlineArrowBackIos size={26} className="go-back-btn back2"/>
      </Link>
    </div>
  )
}

export default IssueDetail;