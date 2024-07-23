
function EmailDisplay() {
  const [showEmail, setShowEmail] = useState(false);

  const handleClick = () => {
    setShowEmail(true);
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: handleClick },
      'Show Email'
      ),
    showEmail && React.createElement(
      'p',
      null,
      'townsam@mail.uc.edu'
      )
    );
}

const container = document.getElementById('email_container');
const root = createRoot(container);
root.render(React.createElement(EmailDisplay));