import React from "react";
const fieldList = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "company",
  "country",
  "state",
  "zipCode",
  "jobTitle"
];
export const optionalLinkedInFields = ["jobTitle", "company", "phone", "zipCode"];
export function loadLinkedInAutofill() {
  // console.log('loadLinkedInAutofill', questions);
  const script = document.createElement("script");
  script.async = false;
  script.charset = "utf-8";
  script.src = `https://www.linkedin.com/autofill/js/autofill.js`; // URL for the third-party library being loaded.
  document.body.appendChild(script);
  script.onload = () => {};
  script.onerror = () => {
    // if (onError) onError();
  };
}
let jsEvent: String[] = [];
type Props = {
  onChangeCallback: Function
}
declare global { // to access the global type String
  interface HTMLInputElement {
    prototyoe: {
      addInputChangedByJsListener(cb: Function): string;
    }
  }
}
export class LoadLinkedInFormTags extends React.Component<Props, {}> {
  componentDidMount() {
    const { onChangeCallback } = this.props;
    try {
      if (typeof window !== "undefined") {
        var valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
        HTMLInputElement.prototype.addInputChangedByJsListener = function(cb: Function) {
          if (!this.hasOwnProperty("_inputChangedByJSListeners")) {
            this._inputChangedByJSListeners = [];
          }
          this._inputChangedByJSListeners.push(cb);
        };
        Object.defineProperty(HTMLInputElement.prototype, "value", {
          get: function() {
            return valueDescriptor.get.apply(this, arguments);
          },
          set: function() {
            var self = this;
            valueDescriptor.set.apply(self, arguments);
            if (this.hasOwnProperty("_inputChangedByJSListeners")) {
              this._inputChangedByJSListeners.forEach(function(cb) {
                cb.apply(self);
              });
            }
          }
        });
        fieldList.forEach(fieldId => {
          const input = document.getElementById(`in-${fieldId}`);
          const eventAdded = jsEvent && jsEvent.indexOf(fieldId) > -1;
          if (input && !eventAdded) {
            try {
              jsEvent.push(fieldId);
              input.addInputChangedByJsListener(function(this: any) {
                if (fieldId === "email") {
                  // set flag true when linkedIn used.
                  onChangeCallback("linkedInAutofill", "1");
                }
                onChangeCallback(fieldId, this.value);
              });
            } catch (e) {
              console.log("Unablae to add addInputChangedByJsListener for the field", fieldId);
            }
          }
        });
      }
    } catch (e) {
      console.log("Error in LinkedIn autofill initiation");
    }
  }
  render() {
    // this.textInput = React.createRef();
    return (
      <>
        <div
          className="linked-in-autofill-btn"
          dangerouslySetInnerHTML={{
            __html: `<script
type="IN/Form2"
data-form="signUpForm"
data-field-firstname="in-firstName"
data-field-lastname="in-lastName"
data-field-phone="in-phone"
data-field-email="in-email"
data-field-company="in-company"
data-field-title="in-jobTitle"
data-field-city="12345"
data-field-state="in-state"
data-field-country="in-country"
data-field-zip="in-zipCode"
></script>
<span style="display:none">
<input type="text" id="in-email" />
<input type="text" id="in-firstName" />
<input type="text" id="in-lastName" />
<input type="tel"  id="in-phone" />
<input type="text" id="in-company" />
<input type="text" id="in-jobTitle" />
<input type="text" id="in-country" />
<input type="text" id="in-state" />
<input type="text" id="in-zipCode" />
</span>`
          }}
        />
      </>
    );
  }
}
export function linkedInAutofillIsEnabled(formConfig) {
  // return true;
  return formConfig && formConfig.linkedInAutofill;
}
export function isButtonHidden() {
  let isSafari;
  try {
    isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
  } catch (e) {}
  return isSafari;
}
export function blurEmail() {
  try {
    const email = document.getElementById("email");
    email.focus();
    setTimeout(() => {
      email.blur();
    }, 10);
  } catch (e) {}
}
export default LoadLinkedInFormTags;
