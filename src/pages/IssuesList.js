import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

/* https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-organization-issues-assigned-to-the-authenticated-user--code-samples */
/* page, per_page 참고? */
const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const [issues, setIssues] = useState([])
  const [page, setPage] = useState(1);
  
  const getIssues = async (page) => {
    const octokit = new Octokit({
      auth: process.env.REACT_ACCESS_TOKEN
    });

    const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'facebook',
      repo: 'react',
      sort: 'comments', /* 코멘트 많은 순으로 정렬 */
      page: page,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    setIssues(current => [...current, ...response.data]);
    setPage(current=>current+1);
    setLoading(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(Math.round(document.documentElement.scrollTop + window.innerHeight) - document.body.scrollHeight > -10) {
        setLoading(true);
      }
    })
    getIssues(1);
  }, [])
  
  useEffect(() => {
    if(loading && page>1 ) {
      setLoading(true);
      getIssues(page);
    }
  }, [loading, page])

  useEffect(()=> {
    console.log(issues, page);
  }, [issues, page])

  const IssuesListComponent = () => {
    //{number, title, user, created_at, comments}
    const listitem = issues.map((issue, index) => 
      <>
        <li key={index} className="issue-li">        
          <div className="info-container">
            <span className="title">
              <Link to={`/${issue.number}`} state={issue}>
                #{issue.number} {issue.title}
              </Link>
            </span>
            <p className="info">작성자: {issue.user.login}, 작성일: {new Intl.DateTimeFormat('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(issue.created_at))}</p>
          </div>
          <div className="comment">
            <span>코멘트: {issue.comments}</span>
          </div>
        </li>
        {(index+1)%4===0?
        <li key={index+'-ad'} className="ad-img">
          <a href="https://www.wanted.co.kr/"><img src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100" alt="광고 이미지" /></a>
        </li>
        :null}
      </>
    );
    
    return (
      <ul className="issue-ul">{listitem}</ul>
    );
  }
    
  return (
    <>
      <Loading isloading={loading}/>
      <div>
        <IssuesListComponent/>
      </div>
    </>
  )
}

export default MainPage;