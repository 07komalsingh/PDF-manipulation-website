import React from "react";

function Faq() {
  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-sm rounded-lg p-6">
        <div className="text-black font-serif text-base">
          <ol className="list-decimal ml-6 space-y-4">
            <ol start="1" className=" list-decimal">
              <li className="text-xl font-serif">
                <p className="font-normal text-left">
                  <span className="text-xl font-bold">Data Privacy FAQ</span>
                </p>
              </li>
            </ol>

            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg font-bold">
                  What types of data does Easy Docoments collect?
                </span>
              </p>
            </li>
            <li className="text-base font-sans">
              <p className="font-normal text-left">
                <span className="text-base">
                  In addition to basic usage statistics and crash reports needed
                  for app functionality, Easy Docoments offers users the
                  opportunity to&nbsp;
                  <span>participate</span>&nbsp;in surveys to earn money. When
                  you choose to&nbsp;
                  <span>participate</span>&nbsp;in these surveys, we may collect
                  responses and relevant data to administer the rewards program.
                  Rest assured, we do not access or store the content of your
                  PDFs unless explicitly&nbsp;
                  <span>required</span>&nbsp;for specific features. All survey
                  data is collected with your consent and&nbsp;
                  <span>is used</span>&nbsp;solely for the purposes of the
                  survey and reward distribution.
                </span>
              </p>
            </li>

            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg font-bold">
                  Does Easy Docoments access the content of my PDFs?
                </span>
              </p>
            </li>
            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg">
                  No, Easy Docoments does not access, store, or share the
                  content of your PDFs. All file processing&nbsp;
                  <span>is done</span>&nbsp;locally on your device, ensuring
                  your documents&nbsp;
                  <span>remain</span>&nbsp;private and secure.
                </span>
              </p>
            </li>

            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg font-bold">
                  Is my data shared with third parties?
                </span>
              </p>
            </li>
            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg">
                  We do not share your personal data with third parties for
                  marketing or other purposes. Any data we collect&nbsp;
                  <span>is solely used</span>&nbsp;to improve the app's
                  functionality and user experience.
                </span>
              </p>
            </li>

            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg font-bold">
                  How does Easy Docoments protect my data?
                </span>
              </p>
            </li>
            <li className="text-base font-serif">
              <p className="font-normal text-left">
                <span>
                  We use industry-standard security measures to protect your
                  data, including encryption and secure storage. Our app&nbsp;
                  <span>is designed&nbsp;</span>
                  <span>
                    to minimize data collection and prioritize your privacy.
                  </span>
                </span>
              </p>
            </li>

            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg font-bold">
                  Does Easy Docoments track my activity?
                </span>
              </p>
            </li>
            <li className="text-base font-serif">
              <p className="font-normal text-left">
                <span>
                  We collect anonymous usage data to help improve the app, but
                  we do not track your individual activities or&nbsp;
                  <span>monitor&nbsp;</span>
                  <span>the content of your documents.</span>
                </span>
              </p>
            </li>

            <li className="text-lg font-serif">
              <p className="font-normal text-left">
                <span className="text-lg font-bold">
                  Can I use Easy Docoments without sharing any data?
                </span>
              </p>
            </li>
            <li className="text-base font-serif">
              <p className="font-normal text-left">
                <span>
                  Yes, Easy Docoments&nbsp;
                  <span>can be used&nbsp;</span>
                  <span>
                    without sharing any personal information. Some features,
                    like cloud backups, may require minimal data sharing, but
                    these are optional.
                  </span>
                </span>
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-normal">
                <span className="font-bold text-base">How can I </span>
                <span className="font-normal text-base">delete</span>
                <span className="font-normal text-base"> my data?</span>
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-normal">
                <span className="font-normal text-base">You can </span>
                <span className="font-normal text-base">delete</span>
                <span className="font-normal text-base">
                  {" "}
                  any data associated with Easy Docoments by uninstalling the
                  app. Any files created or edited using the app are stored on
                  your device and{" "}
                </span>
                <span className="font-normal text-base">can be managed</span>
                <span className="font-normal text-base"> directly by you.</span>
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-bold text-base">
                Is my data stored on Easy Documents' servers?
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-normal">
                <span className="font-normal text-base">
                  No, all your files and data are stored locally on your device.
                  We do not store any of your files on our servers.
                </span>
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-bold text-base">
                Does Easy Docoments require an internet connection?
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-normal">
                <span className="font-normal text-base">
                  An internet connection is only{" "}
                </span>
                <span className="font-normal text-base">required</span>
                <span className="font-normal text-base">
                  {" "}
                  for certain features, like downloading updates or accessing
                  cloud storage services. Core functionalities like editing and
                  viewing PDFs can be used offline.
                </span>
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-bold text-base">
                How does Easy Docoments handle permissions?
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-normal">
                <span className="font-normal text-base">
                  Easy Docoments requests only the necessary permissions for the
                  app to function. For example, we may ask for storage access to
                  manage your PDFs. We do not access any data beyond what is{" "}
                </span>
                <span className="font-normal text-base">required</span>
                <span className="font-normal text-base"> for the app to </span>
                <span className="font-normal text-base">operate</span>
                <span className="font-normal text-base">.</span>
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-bold text-base">
                What is Easy Documents' stance on data privacy?
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-normal">
                <span className="font-bold text-base">
                  Easy Docoments is committed to protecting your privacy and
                  ensuring your data{" "}
                </span>
                <span className="font-normal text-base">remains</span>
                <span className="font-normal text-base">
                  {" "}
                  secure. We collect minimal information and prioritize user
                  confidentiality.
                </span>
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-bold text-base">
                Does Easy Docoments collect personal information?
              </p>
            </li>
            <li className="m-0 p-0 text-base font-serif">
              <p className="m-0 p-0 font-normal">
                <span className="font-normal text-base">
                  We only collect non-identifiable information like app usage
                  statistics and crash reports. Personal information{" "}
                </span>
                <span className="font-normal text-base">is not collected</span>
                <span className="font-normal text-base">
                  {" "}
                  without your explicit consent.
                </span>
              </p>
            </li>
            <li className="mb-0 text-base font-serif">
              <p className="m-0 p-0 text-left text-black">
                <span className="font-bold">
                  Why does Easy Docoments collect any data at all?
                </span>
                <span>
                  The data we collect helps us improve app functionality, fix
                  bugs, and provide a better user experience. All data
                  collection is anonymized and non-intrusive.
                </span>
              </p>
            </li>
            <li className="mb-0 text-base font-serif">
              <p className="m-0 p-0 text-left text-black">
                <span className="font-bold">
                  Is my personal data ever sold to third parties?
                </span>
                <span>
                  No, we do not sell, trade, or rent your personal data to third
                  parties under any circumstances.
                </span>
              </p>
            </li>
            <li className="mb-0 text-base font-serif">
              <p className="m-0 p-0 text-left text-black">
                <span className="font-bold">
                  How does Easy Docoments comply with GDPR?
                </span>
                <span>
                  Easy Docoments complies with GDPR by ensuring all data
                  processing is lawful, transparent, and limited to what is
                  necessary. Users have the right to access, correct, or delete
                  their data.
                </span>
              </p>
            </li>
            <li className="mb-0 text-base font-serif">
              <p className="m-0 p-0 text-left text-black">
                <span className="font-bold">
                  What data does Easy Docoments need to function properly?
                </span>
                <span>
                  We require minimal data such as storage access for managing
                  files and basic usage information for app improvement.
                </span>
              </p>
            </li>
            <li className="mb-0 text-base font-serif">
              <p className="m-0 p-0 text-left text-black">
                <span className="font-bold">
                  Can I opt-out of data collection?
                </span>
                <span>
                  Yes, you can opt out of data collection through the app
                  settings, although this may limit certain features.
                </span>
              </p>
            </li>
            <ol start="21" className="list-decimal ">
              <li className="mb-0 text-base font-serif">
                <p className="m-0 p-0 text-left text-black">
                  <span className="font-bold">
                    How does Easy Docoments handle user consent for data
                    collection?
                  </span>
                  <span>
                    We request explicit user consent before collecting any data.
                    Users can withdraw consent at any time.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="22" className="list-decimal">
              <li className="mb-0  text-base font-serif e">
                <p className="m-0 p-0 font-normal normal-case text-left  text-black">
                  <span className="text-base font-bold">
                    Are my interactions with Easy Docoments recorded?
                  </span>
                  <span className="text-base ">
                    No, your interactions are not recorded or monitored. We only
                    collect anonymous usage data for app improvement.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="23" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 font-normal normal-case align-baseline text-left indent-0 bg-transparent text-black">
                  <span className="text-base leading-6 font-bold">
                    Does Easy Docoments collect data when I'm offline?
                  </span>
                  <span className="text-base leading-6">
                    No, data collection only occurs when you're online, and even
                    then, it's minimal and primarily related to app performance.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="24" className="list-decimal">
              <li className="m-0 p-0 text-base font-serif ">
                <p className="m-0 p-0 font-bold normal-case align-baseline text-left indent-0 bg-transparent text-black">
                  <span className="text-base leading-6 font-bold">
                    File and Content Privacy
                  </span>
                </p>
              </li>
            </ol>
            <ol start="25" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 font-normal normal-case align-baseline text-left indent-0 bg-transparent text-black">
                  <span className="text-base leading-6 font-bold">
                    Does Easy Docoments have access to my files?
                  </span>
                  <span className="text-base leading-6">
                    Easy Docoments only accesses files when you actively open
                    them within the app. We do not store or monitor these files.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="26" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif ">
                <p className="m-0 p-0 font-normal normal-case align-baseline text-left indent-0 bg-transparent text-black">
                  <span className="text-base leading-6 font-bold">
                    Are my PDF files stored on Easy Documents' servers?
                  </span>
                  <span className="text-base leading-6">
                    No, all files remain on your device unless you choose to
                    upload them to a cloud service.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="27" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif ">
                <p className="m-0 p-0 font-normal normal-case align-baseline text-left indent-0 bg-transparent text-black">
                  <span className="text-base leading-6 font-bold">
                    How does Easy Docoments process my files?
                  </span>
                  <span className="text-base leading-6">
                    All file processing occurs locally on your device, ensuring
                    that your documents are never transmitted or stored
                    externally.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="28" className="list-decimal">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 font-normal normal-case align-baseline text-left indent-0 bg-transparent text-black">
                  <span className="text-base leading-6 font-bold">
                    Can Easy Docoments read the content of my PDFs?
                  </span>
                  <span className="text-base leading-6">
                    No, the content of your PDFs is not accessible to us. All
                    editing and reading occur on your device.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="29" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif ">
                <p className="m-0 p-0 font-normal normal-case align-baseline text-left text-black">
                  <span className="text-base leading-6 font-bold">
                    Is the content of my documents encrypted?
                  </span>
                  <span className="text-base leading-6">
                    Yes, any data stored on your device through Easy Docoments
                    is protected by your device's encryption.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="30" className="list-decimal">
              <li className="m-0 p-0 text-base font-serif ">
                <p className="m-0 p-0 font-normal normal-case align-baseline text-left indent-0 bg-transparent text-black">
                  <span className="text-base leading-6 font-bold">
                    What happens to my files after editing?
                  </span>
                  <span className="text-base leading-6">
                    After editing, your files remain on your device. We do not
                    upload or backup your files unless you initiate it through a
                    cloud service.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="31" className=" list-decimal">
              <li className=" text-base font-serif">
                <p className="m-0 p-0 text-black bg-transparent text-left">
                  <span className="font-bold text-base leading-6">
                    Does Easy Docoments create backups of my files?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Easy Docoments does not create backups unless you connect to
                    a cloud service like Google Drive. You control all backups.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="32" className="list-decimal ">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 text-black bg-transparent text-left">
                  <span className="font-bold text-base leading-6">
                    Are my files <span className="font-bold">deleted</span>{" "}
                    after I uninstall Easy Docoments?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Uninstalling the app will not{" "}
                    <span className="font-bold">delete</span> your files. They{" "}
                    <span className="font-bold">remain</span> on your device and
                    can be accessed through your file manager.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="33" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 text-black bg-transparent text-left">
                  <span className="font-bold text-base leading-6">
                    Can Easy Docoments share my files with others?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Easy Docoments does not share your files without your
                    explicit action. You control all sharing through the app.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="34" className="list-decimal">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 text-black bg-transparent text-left">
                  <span className="font-bold text-base leading-6">
                    Is my document history stored?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    No, Easy Docoments does not store a history of your document
                    edits or views.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="35" className=" list-decimal ">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 text-black bg-transparent text-left font-bold">
                  <span className="font-bold text-base leading-6">
                    Security Measures
                  </span>
                </p>
              </li>
            </ol>
            <ol start="36" className=" list-decimal ">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 text-black bg-transparent text-left">
                  <span className="font-bold text-base leading-6">
                    What security measures does Easy Docoments use to protect my
                    data?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    We use encryption, secure access protocols, and anonymized
                    data collection to protect your data.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="37" className="list-decimal ">
              <li className="m-0 p-0 text-base font-serif">
                <p className="m-0 p-0 text-black bg-transparent text-left">
                  <span className="font-bold text-base leading-6">
                    How does Easy Docoments ensure{" "}
                    <span className="font-bold">my data</span> isn't accessed by
                    unauthorized parties?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Data encryption and secure app architecture prevent
                    unauthorized access to your information.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="38" className="list-decimal ">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    Is data transmitted to Easy Docoments secure?
                  </span>
                  <span>
                    {" "}
                    Yes, any data transmitted (such as usage statistics) is
                    encrypted and securely transmitted.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="39" className="list-decimal ">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    Does Easy Docoments protect against data breaches?
                  </span>
                  <span>
                    {" "}
                    We implement strict security protocols to prevent data
                    breaches and continuously monitor for potential threats.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="40" className="list-decimal ">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    How often is Easy Documents' security updated?
                  </span>
                  <span>
                    {" "}
                    Security is regularly updated with each app update to
                    address new threats and vulnerabilities.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="41" className="list-decimal">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    Does Easy Docoments use third-party services?
                  </span>
                  <span>
                    {" "}
                    If third-party services are used (e.g., for analytics), they
                    are carefully vetted to ensure they meet our strict privacy
                    standards.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="42" className="list-decimal ">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    Are passwords and sensitive information stored by Easy
                    Documents?
                  </span>
                  <span>
                    {" "}
                    No, Easy Docoments does not store passwords or sensitive
                    personal information.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="43" className="list-decimal">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    How does Easy Docoments handle security vulnerabilities?
                  </span>
                  <span>
                    {" "}
                    We take immediate action to patch any identified
                    vulnerabilities and notify users if necessary.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="44" className="list-decimal ">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    What should I do if I suspect a security issue with Easy
                    Documents?
                  </span>
                  <span>
                    {" "}
                    If you suspect a security issue, contact our support team
                    immediately for assistance.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="45" className="list-decimal ">
              <li className="text-base font-serif">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="font-bold">
                    Is there two-factor authentication (2FA) for cloud services?
                  </span>
                  <span>
                    {" "}
                    If you connect Easy Docoments to a cloud service, we
                    recommend enabling 2FA on that service for added security.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="46" className="list-decimal">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-bold text-left">
                  <span className="text-base leading-6 font-bold">
                    Permissions and User Control
                  </span>
                </p>
              </li>
            </ol>
            <ol start="47" className=" list-decimal ">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    Why does Easy Docoments request storage permissions?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Storage permissions are needed to access and edit your PDF
                    files. We only access the files you choose to open.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="48" className="list-decimal">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    Can I limit the permissions Easy Docoments has?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Yes, you can control app permissions through your device
                    settings, but this may limit some functionalities.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="49" className=" list-decimal ">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    Does Easy Docoments request unnecessary permissions?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    No, Easy Docoments only requests the minimum permissions
                    required for essential functions.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="50" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    Can I revoke permissions after granting them?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Yes, you can revoke permissions at any time through your
                    device's settings.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="51" className=" list-decimal ">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    Does Easy Docoments use location data?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    No, Easy Docoments does not request or use location data.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="52" className="list-decimal ">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    How can I control what data Easy Docoments collects?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    You can manage data collection preferences in the app
                    settings, including opting out of analytics.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="53" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    Does Easy Docoments need an internet connection to work?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Most features work offline, but an internet connection is
                    required for cloud syncing and updates.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="54" className=" list-decimal">
              <li className="m-0 p-0 text-base font-serif align-baseline">
                <p className="m-0 p-0 font-normal text-left">
                  <span className="text-base leading-6 font-bold">
                    Can I delete my account and data from Easy Docoments?
                  </span>
                  <span className="text-base leading-6">
                    {" "}
                    Since Easy Docoments doesn't require an account, you only
                    need to uninstall the app to remove it. Files remain on your
                    device.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="55" className="list-decimal">
              <li>
                <p className="text-base font-normal text-black">
                  <span className="font-bold">
                    What happens to my data if I uninstall Easy Docoments?
                  </span>
                  <span>
                    {" "}
                    Uninstalling the app removes all app-related data, but your
                    PDF files remain on your device.
                  </span>
                </p>
              </li>
            </ol>

            <ol start="56" className="list-decimal">
              <li>
                <p className="text-base font-normal text-black">
                  <span className="font-bold">
                    Can I export my data from Easy Docoments?
                  </span>
                  <span>
                    {" "}
                    Since we don't store personal data, there's no need for data
                    export. All files are stored locally on your device.
                  </span>
                </p>
              </li>
            </ol>

            <ol
              start="57"
              className="list-decimal text-base font-normal text-black"
            >
              <li>
                <p className="text-base font-bold text-black">
                  <span className="font-bold">Legal and Compliance</span>
                </p>
              </li>
            </ol>

            <ol
              start="58"
              className="list-decimal text-base font-normal text-black"
            >
              <li>
                <p className="text-base font-normal text-black">
                  <span className="font-bold">
                    Is Easy Docoments compliant with COPPA?
                  </span>
                  <span>
                    {" "}
                    Yes, Easy Docoments complies with COPPA by not collecting
                    personal data from children under 13 without parental
                    consent.
                  </span>
                </p>
              </li>
            </ol>

            <ol
              start="59"
              className="list-decimal text-base font-normal text-black"
            >
              <li>
                <p className="text-base font-normal text-black">
                  <span className="font-bold">
                    How does Easy Docoments comply with CCPA?
                  </span>
                  <span>
                    {" "}
                    Easy Docoments complies with CCPA by providing transparency
                    about data collection and offering users the right to
                    opt-out.
                  </span>
                </p>
              </li>
            </ol>

            <ol
              start="60"
              className="list-decimal  text-base font-normal text-black"
            >
              <li>
                <p className="text-base font-normal text-black">
                  <span className="font-bold">
                    How does Easy Docoments handle legal requests for data?
                  </span>
                  <span>
                    {" "}
                    We do not collect or store personal data, so there is
                    typically nothing to provide in response to legal requests.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="61" className="list-decimal ">
              <li className="text-lg font-serif mb-2">
                <p className="text-black font-normal text-base">
                  <span className="font-bold text-lg">
                    Does Easy Docoments transfer data internationally?
                  </span>
                  <span className="text-base">
                    {" "}
                    No, we do not transfer your data internationally, as all
                    processing occurs locally on your device.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="62" className="list-decimal ">
              <li className="text-lg font-serif mb-2">
                <p className="text-black font-normal text-base">
                  <span className="font-bold text-lg">
                    Does Easy Docoments have a privacy policy?
                  </span>
                  <span className="text-base">
                    {" "}
                    Yes, our privacy policy is available in the app and on our
                    website, detailing all data practices.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="63" className="list-decimal ">
              <li className="text-lg font-serif mb-2">
                <p className="text-black font-normal text-base">
                  <span className="font-bold text-lg">
                    Can I review the privacy practices of Easy Docoments?
                  </span>
                  <span className="text-base">
                    {" "}
                    Yes, you can review our privacy policy at any time for
                    detailed information on our practices.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="64" className="list-decimal ">
              <li className="text-lg font-serif mb-2">
                <p className="text-black font-normal text-base">
                  <span className="font-bold text-lg">
                    How does Easy Docoments handle changes to the privacy
                    policy?
                  </span>
                  <span className="text-base">
                    {" "}
                    We notify users of any significant changes to the privacy
                    policy through the app or email.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="65" className="list-decimal ">
              <li className="text-lg font-serif mb-2">
                <p className="text-black font-normal text-base">
                  <span className="font-bold text-lg">
                    Is Easy Docoments HIPAA compliant?
                  </span>
                  <span className="text-base">
                    {" "}
                    While Easy Docoments is secure, it{" "}
                    <span className="font-normal">is not certified</span> for
                    handling Protected Health Information (PHI) under HIPAA.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="66" className="list-decimal ">
              <li className="text-lg font-serif mb-2">
                <p className="text-black font-normal text-base">
                  <span className="font-bold text-lg">
                    What are my rights under GDPR with Easy Docoments?
                  </span>
                  <span className="text-base">
                    {" "}
                    Under GDPR, you have the right to access, correct,{" "}
                    <span className="font-normal">delete</span>, and restrict
                    the processing of your data.
                  </span>
                </p>
              </li>
            </ol>
            <ol start="67" className="list-decimal ">
              <li className="text-lg font-serif mb-2">
                <p className="text-black font-normal text-base">
                  <span className="font-bold text-lg">
                    Who can I contact for privacy-related inquiries?
                  </span>
                  <span className="text-base">
                    {" "}
                    For any privacy-related questions, you can contact our
                    support team directly through the app or via our website.
                  </span>
                </p>
              </li>
            </ol>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Faq;
