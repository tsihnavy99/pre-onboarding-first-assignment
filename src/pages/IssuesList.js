import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";

const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const [issues, setIssues] = useState([])

  useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.REACT_ACCESS_TOKEN
    })

    const getIssues = async () => {
      const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: 'facebook',
        repo: 'react',
        sort: 'comments', /* 코멘트 많은 순으로 정렬 */
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      setIssues(response.data);
    }
    getIssues();
  }, [])

  useEffect(() => {
    if(issues.length>0) {
      setLoading(false);
    }
  }, [issues])

  const IssuesListComponent = () => {
    const listitem = issues.map(({number, title, user, created_at, comments}, index) => 
      <>
        <li key={index} className="issue-li">        
          <div className="info">
            <span className="title">#{number} {title}</span>
            <p className="info">작성자: {user.login}, 작성일: {Date.parse(created_at)}</p>
          </div>
          <div className="comment">
            <span>코멘트: {comments}</span>
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
      {loading?
      <div>Loading...</div>:/* 임시로딩 */
      <div>
        <IssuesListComponent/>
      </div>}
    </>
  )
}

export default MainPage;