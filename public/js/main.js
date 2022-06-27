const Input = $( '.form__area :input' ).not( ':button' );
const Button = $( '.area__button' );

const cycleInputs = inputs => {
  let allInputs=[];
  $( '.form__area :input' ).not( ':button' ).each((i, e) => {
    return allInputs.push(e);
  });
  return allInputs;
}

const isEmpty = value => {
  let inputs = cycleInputs().map(e => e.value == '' ? e : '' ).filter(e => e != '');
  inputs.push($( '.area__email' )[0]);
  return inputs;
}

const addClass = input => input.forEach(e => {
  let input = $( `.${e.className}` );
  if (e.type == 'email' && validateEmail(e.value)) 
    return;
  return input.addClass( 'input--warning error--icon' )
});

const rmClass = input => $( `.${input}` ).removeClass( 'input--warning error--icon u-red' );

const validateEmail = email =>  /\S+@\S+\.\S+/.test(email);

const pText = pClass => {
  let a = 'area__';
  let end = 'cannot be empty';
  switch(pClass) {
    case `${a}first-name`:
      return `First Name ${end}`;
    case `${a}last-name`:
      return `Last Name ${end}`;
    case `${a}email`:
      let email = $( '.area__email' );
      if (!validateEmail(email[0].value) && email[0].value.length >= 1) {
        email.addClass( 'u-red' );
        return `Looks like this is not an email`;
      }
      else if (email[0].value.length < 1) {
        return `Email ${end}`;
      }
      return false;
    case `${a}password`:
      return `Password ${end}`;
    default:
      console.log('What\'s?? this should not happen... sorry..');
  }
};

const createP = text => {
  let p = $( `<p>${text}</p>` ).addClass( 'error--text' );
  return p;
};

const addP = input => {
  if (input.length == 1) { 
    if (input[0].nextSibling.tagName == 'P') return;
    let toAdd = input[0].classList[0]
    if (!pText(toAdd)) return;
    return $( `.${toAdd}` ).after( createP(pText(toAdd)) );
  }
  input.forEach(e => {
    if (e.nextSibling.tagName == 'P') return;
    let toAdd = e.classList[0]
    if (!pText(toAdd)) return;
    return $( `.${toAdd}` ).after( createP(pText(toAdd)) );
  });
};

const warning = input => {
  addClass(input);
  addP(input);
};

const rmElement = input => {
  let tag = $('.' + input)[0].nextSibling;
  if ( tag.tagName == 'P') 
    return tag.remove();
};

const rmWarning = input => {
  rmClass(input);
  rmElement(input);
};

const focusRmWarning = e => Input.focus(e => {
  rmWarning(e.target.classList[0])
});

function buttonPress() {
  Button.click(e => {
    console.log(e);
    warning(isEmpty());
  });
}

function App() {
  focusRmWarning();
  buttonPress();
}

App();
