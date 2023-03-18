const BackDrop = ({ children, showSignUp, setShowSignUp }) => {
  return (
    <div
      className={showSignUp ? "signUpContainer" : ""}
      onClick={() => setShowSignUp(false)}
    >
      {children}
    </div>
  );
};

export default BackDrop;
