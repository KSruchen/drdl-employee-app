import EmployeeForm from './components/EmployeeForm';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        background: 'linear-gradient(90deg,#dae2f8 0%,#d6a4a4 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2em'
      }}
    >
      <h1 style={{
        margin: '1em 0',
        color: '#234',
        fontWeight: 700,
        textAlign: 'center'
      }}>
        Employee Management Portal
      </h1>
      <EmployeeForm />
    </div>
  );
}

export default App;
