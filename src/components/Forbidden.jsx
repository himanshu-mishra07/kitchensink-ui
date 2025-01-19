function Forbidden() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-5 border rounded shadow-sm bg-white">
        <h1 className="display-1 text-danger">403</h1>
        <h2 className="mb-4">Forbidden</h2>
        <p className="mb-4">You do not have permission to access this page.</p>
      </div>
    </div>
  )
}

export default Forbidden