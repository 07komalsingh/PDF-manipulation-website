const faqs = [
  {
    type: 'header',
    content: 'General Information',
  },
  {
    question: "What types of data does Easy Docoments collect?",
    answer: "In addition to basic usage statistics and crash reports needed for app functionality, Easy Docoments offers users the opportunity to participate in surveys to earn money. When you choose to participate in these surveys, we may collect responses and relevant data to administer the rewards program. Rest assured, we do not access or store the content of your PDFs unless explicitly required for specific features. All survey data is collected with your consent and is used solely for the purposes of the survey and reward distribution."
  },
  {
    question: "Does Easy Docoments access the content of my PDFs?",
    answer: "No, Easy Docoments does not access, store, or share the content of your PDFs. All file processing is done locally on your device, ensuring your documents remain private and secure."
  },
  
  {
    question: "Is my data shared with third parties?",
    answer: "We do not share your personal data with third parties for marketing or other purposes. Any data we collect is solely used to improve the app's functionality and user experience."
  },
  {
    question: "How does Easy Docoments protect my data?",
    answer: "We use industry-standard security measures to protect your data, including encryption and secure storage. Our app is designed to minimize data collection and prioritize your privacy."
  },
  
  {
    question: "Does Easy Docoments track my activity?",
    answer: "We collect anonymous usage data to help improve the app, but we do not track your individual activities or monitor the content of your documents."
  },
  {
    question: "Can I use Easy Docoments without sharing any data?",
    answer: "Yes, Easy Docoments can be used without sharing any personal information. Some features, like cloud backups, may require minimal data sharing, but these are optional."
  },
  {
    question: "How can I delete my data?",
    answer: "You can delete any data associated with Easy Docoments by uninstalling the app. Any files created or edited using the app are stored on your device and can be managed directly by you."
  },
  {
    question: "Is my data stored on Easy docoments' servers?",
    answer: "No, all your files and data are stored locally on your device. We do not store any of your files on our servers."
  },
  {
    question: "Does Easy Docoments require an internet connection?",
    answer: "An internet connection is only required for certain features, like downloading updates or accessing cloud storage services. Core functionalities like editing and viewing PDFs can be used offline."
  },
  {
    question: "How does Easy Docoments handle permissions?",
    answer: "Easy Docoments requests only the necessary permissions for the app to function. For example, we may ask for storage access to manage your PDFs. We do not access any data beyond what is required for the app to operate."
  },
  {
    type: 'header',
    content: 'General Data Privacy',
  },

  {
    question: "What is Easy docoments' stance on data privacy?",
    answer: "Easy Docoments is committed to protecting your privacy and ensuring your data remains secure. We collect minimal information and prioritize user confidentiality."
  },
  {
    question:"Does Easy docoments collect personal information?",
    answer:"We only collect non-identifiable information like app usage statistics and crash reports. Personal information is not collected without your explicit consent."
  },
  {
    question:"Why does Easy docoments collect any data at all?",
    answer:"The data we collect helps us improve app functionality, fix bugs, and provide a better user experience. All data collection is anonymized and non-intrusive."
  },
  {
    question:"Is my personal data ever sold to third parties?",
    answer:"No, we do not sell, trade, or rent your personal data to third parties under any circumstances."
  },
  {
    question:"How does Easy docoments comply with GDPR?",
    answer:"Easy docoments complies with GDPR by ensuring all data processing is lawful, transparent, and limited to what is necessary. Users have the right to access, correct, or delete their data."
  },
  {
    question:"What data does Easy docoments need to function properly? ",
    answer:"We require minimal data such as storage access for managing files and basic usage information for app improvement."
  },
  {
    question:"Can I opt-out of data collection? ",
    answer:"Yes, you can opt out of data collection through the app settings, although this may limit certain features."
  },
  {
    question:"How does Easy docoments handle user consent for data collection? ",
    answer:"We request explicit user consent before collecting any data. Users can withdraw consent at any time."
  },
  {
    question:"Are my interactions with Easy docoments recorded? ",
    answer:"No, your interactions are not recorded or monitored. We only collect anonymous usage data for app improvement."
  },
  {
    question:"Does Easy docoments collect data when I'm offline?",
    answer:"No, data collection only occurs when you're online, and even then, it's minimal and primarily related to app performance."
  },
  {
    question:"Does Easy docoments have access to my files?",
    answer:"Easy docoments only accesses files when you actively open them within the app. We do not store or monitor these files."
  },
  {
    type: 'header',
    content: 'File and Content Privacy',
  },
  {
    question:"Are my PDF files stored on Easy docoments' servers? ",
    answer:"No, all files remain on your device unless you choose to upload them to a cloud service"
  },
  {
    question:"How does Easy docoments process my files? ",
    answer:"All file processing occurs locally on your device, ensuring that your documents are never transmitted or stored externally."
  },
  {
    question:"Can Easy docoments read the content of my PDFs? ",
    answer:"No, the content of your PDFs is not accessible to us. All editing and reading occur on your device."
  },
  {
    question:"Is the content of my documents encrypted?",
    answer:"Yes, any data stored on your device through Easy docoments is protected by your device's encryption."
  },
  {
    question:"What happens to my files after editing?",
    answer:"After editing, your files remain on your device. We do not upload or backup your files unless you initiate it through a cloud service."
  },
  {
    question:"Does Easy docoments create backups of my files?",
    answer:"Easy docoments does not create backups unless you connect to a cloud service like Google Drive. You control all backups."
  },
  {
    question:"Are my files deleted after I uninstall Easy docoments? ",
    answer:"Uninstalling the app will not delete your files. They remain on your device and can be accessed through your file manager."
  },
  {
    question:"Can Easy docoments share my files with others? ",
    answer:"Easy docoments does not share your files without your explicit action. You control all sharing through the app."
  },
  {
    question:"Is my document history stored? ",
    answer:"No, Easy docoments does not store a history of your document edits or views."
  },
  {
    type: 'header',
    content: 'Security Measures',
  },
  {
    question:"What security measures does Easy docoments use to protect my data?",
    answer:"We use encryption, secure access protocols, and anonymized data collection to protect your data."
  },
  {
    question:"How does Easy docoments ensure my data isn't accessed by unauthorized parties?",
    answer:"Data encryption and secure app architecture prevent unauthorized access to your information."
  },
  {
    question:"Is data transmitted to Easy docoments secure? ",
    answer:"Yes, any data transmitted (such as usage statistics) is encrypted and securely transmitted."
  },
  {
    question:"Does Easy docoments protect against data breaches?",
    answer:"We implement strict security protocols to prevent data breaches and continuously monitor for potential threats."
  },  {
    question:"How often is Easy docoments' security updated?",
    answer:"Security is regularly updated with each app update to address new threats and vulnerabilities."
  },  {
    question:"Does Easy docoments use third-party services?",
    answer:"If third-party services are used (e.g., for analytics), they are carefully vetted to ensure they meet our strict privacy standards."
  },  {
    question:"Are passwords and sensitive information stored by Easy docoments?",
    answer:"No, Easy docoments does not store passwords or sensitive personal information."
  },  {
    question:"How does Easy docoments handle security vulnerabilities?",
    answer:"We take immediate action to patch any identified vulnerabilities and notify users if necessary."
  },  {
    question:"What should I do if I suspect a security issue with Easy docoments?",
    answer:"If you suspect a security issue, contact our support team immediately for assistance."
  },  {
    question:"Is there two-factor authentication (2FA) for cloud services?",
    answer:"If you connect Easy docoments to a cloud service, we recommend enabling 2FA on that service for added security."
  }, 
  {
    type: 'header',
    content: 'Permissions and User Control',
  },
  
  {
    question:"Why does Easy docoments request storage permissions? ",
    answer:"Storage permissions are needed to access and edit your PDF files. We only access the files you choose to open."
  },  {
    question:"Can I limit the permissions Easy docoments has?",
    answer:"Yes, you can control app permissions through your device settings, but this may limit some functionalities."
  },  {
    question:"Does Easy docoments request unnecessary permissions?",
    answer:"No, Easy docoments only requests the minimum permissions required for essential functions."
  },  {
    question:"Can I revoke permissions after granting them?",
    answer:"Yes, you can revoke permissions at any time through your device's settings."
  },  {
    question:"Does Easy docoments use location data?",
    answer:"No, Easy docoments does not request or use location data."
  },  {
    question:"How can I control what data Easy docoments collects? ",
    answer:"You can manage data collection preferences in the app settings, including opting out of analytics."
  },  {
    question:"Does Easy docoments need an internet connection to work? ",
    answer:"Most features work offline, but an internet connection is required for cloud syncing and updates."
  },  {
    question:"Can I delete my account and data from Easy docoments?",
    answer:"Since Easy docoments doesn't require an account, you only need to uninstall the app to remove it. Files remain on your device."
  },  {
    question:"What happens to my data if I uninstall Easy docoments?",
    answer:"Uninstalling the app removes all app-related data, but your PDF files remain on your device."
  },  {
    question:"Can I export my data from Easy docoments?",
    answer:"Since we don't store personal data, there's no need for data export. All files are stored locally on your device."
  }, 
  {
    type: 'header',
    content: 'Legal and Compliance',
  },
  {
    question:"Is Easy docoments compliant with COPPA? ",
    answer:"Yes, Easy docoments complies with COPPA by not collecting personal data from children under 13 without parental consent."
  },
  {
    question:"How does Easy docoments comply with CCPA?",
    answer:"Easy docoments complies with CCPA by providing transparency about data collection and offering users the right to opt-out."
  },{
    question:"How does Easy docoments handle legal requests for data?",
    answer:"We do not collect or store personal data, so there is typically nothing to provide in response to legal requests."
  },{
    question:"Does Easy docoments transfer data internationally?",
    answer:"No, we do not transfer your data internationally, as all processing occurs locally on your device."
  },{
    question:"Does Easy docoments have a privacy policy?",
    answer:"Yes, our privacy policy is available in the app and on our website, detailing all data practices."
  },{
    question:"Can I review the privacy practices of Easy docoments? ",
    answer:"Yes, you can review our privacy policy at any time for detailed information on our practices."
  },{
    question:"How does Easy docoments handle changes to the privacy policy?",
    answer:"We notify users of any significant changes to the privacy policy through the app or email."
  },{
    question:"Is Easy docoments HIPAA compliant?",
    answer:"While Easy docoments is secure, it is not certified for handling Protected Health Information (PHI) under HIPAA."
  },
  {
    question:"What are my rights under GDPR with Easy docoments?",
    answer:"Under GDPR, you have the right to access, correct, delete, and restrict the processing of your data."
  },
  {
    question:"Who can I contact for privacy-related inquiries?",
    answer:"For any privacy-related questions, you can contact our support team directly through the app or via our website."
  },

];
import React, { useState,useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons for dropdown
const Faq=()=> {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []); 

  const handleToggle = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0; // Initialize question index

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100 font-Poppins">
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-lg p-6 font-Poppins">
        <div className="text-black font-serif text-base font-Poppins">
          {faqs.map((item, index) => {
            if (item.type === 'header') {
              // Reset question index for each header
              questionIndex = 0;
              return (
                <div key={index} className="mt-6 mb-4 font-Poppins">
                  <h2 className="text-2xl font-bold font-Poppins">{item.content}</h2>
                </div>
              );
            }
            
            // FAQ item rendering
            questionIndex++; // Increment question index for each question
            return (
              <div key={index} className="mb-4 font-Poppins">
                <div
                  className="flex items-center cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-colors font-Poppins"
                  onClick={() => handleToggle(index)}
                >
                  <span className="flex-1 font-bold text-lg font-Poppins">
                    {questionIndex}. {item.question}
                  </span>
                  <span className="ml-2 bg-gray-300 p-1 rounded-full font-Poppins">
                    {openIndex === index ? (
                      <FaChevronUp className="text-gray-600 font-Poppins" />
                    ) : (
                      <FaChevronDown className="text-gray-600 font-Poppins" />
                    )}
                  </span>
                </div>
                {openIndex === index && (
                  <p className="font-normal text-left mt-2 text-base font-Poppins">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Faq;