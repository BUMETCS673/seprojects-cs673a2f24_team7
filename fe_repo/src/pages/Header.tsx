export const Header = () => {
  const headerStyle = {
    borderWidth: '2px',
    padding: '16px',
    fontSize: '2rem',
    fontWeight: 'bold' as 'bold',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center',
    color: '#333', // Softer text color
  };

  return (
    <div className="border-2 p-fined text-3xl font-bold" style={headerStyle}>
      CVCoach
    </div>
  )
}

