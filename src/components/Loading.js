import '../App.css';

const Loading = (isLoading) => {
  return (
    <div className="loading" isloading={String(isLoading.isloading)}>
      <div>
        <span className="circle circle1"></span>
        <span className="circle circle2"></span>
        <span className="circle circle3"></span>
      </div>
      <div>Loading...</div>
    </div>
  )
}

export default Loading;