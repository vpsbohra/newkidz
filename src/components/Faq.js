import React from 'react';
import { useState } from 'react';
import Footer from './Footer';
import search_keywordIMG from '../images/search_keyword.png';
import Header from './Header';
import circle_chev_BACKIMG from '../images/Circle_Chev_Down_clrr.png';
import aboutimg from '../images/about.png';
import policiesimg from '../images/robot.png';
import accountimg from '../images/account.png';
import subscriptionimg from '../images/pencil.png';
import Accordion from './Accordion';
import Circle_Chev_Downa from '../images/Circle_Chev_Down01.png';



const Answers = [
	{
		question: "What is KidzConnect",
		answer: "KidzConnect, made by parents for parents, is a platform dedicated to providing an interactive and educational space for children while strengthening the parent-child bond. It offers a wide range of engaging stories, activities, and opportunities for kids to learn, be heard and have fun. Parents can join in, too, by sharing in their children's learning journey and creating lasting memories together. KidzConnect aims to innovate the way we preserve cherished moments by incorporating sound while making learning enjoyable, all while fostering meaningful family connections.",
	},
	{
		question: "Is the KidzConnect environment safe and secure for children",
		answer: "We understand how as a parent you’d have concerns about your children’s safety online. At KidzConnect, we prioritize the safety and security of children using our platform. We have implemented robust parental control solutions to create a secure environment where you will have complete control over your children's conversations and activity, ensuring their online safety.",
	},
	{
		question: "How old do you have to be to use KidzConnect",
		answer: 'KidzConnect is designed for children aged 7 to 12 years old.',
	},
	{
		question: "Is KidzConnect available on mobile",
		answer: 'Yes, KidzConnect is accessible through mobile devices with an internet connection.',
	},
	{
		question: "Is KidzConnect available in multiple languages",
		answer: 'Currently, KidzConnect is available in the following 5 languages: English, French, Spanish, Portuguese and German. ',
	},
	{
		question: "How do I create an account on KidzConnect",
		answer: "To create an account on KidzConnect, simply click onto the login button on the top right of our website's landing page and follow the easy registration process.",
	},
	{
		question: "How can I register multiple children with a single email address",
		answer: 'Each child can have their own KidzConnect account linked to a single parent email address. During the registration process, you can add multiple child profiles, the exact amount depending on your selected subscription plan. Click here for more details about all our subscription plans.',
	},
	{
		question: "How can I modify my profile information",
		answer: 'You can edit your profile information by logging into your KidzConnect account, going to your profile settings on your dashboard, and making the desired changes.',
	},
	{
		question: "How can I recover my password if I forget it",
		answer: 'If you forget your password, simply click on the "Forgot Password" link on the login page. We will send you instructions on how to reset your password via your email address.',
	},
	{
		question: "How can I cancel my KidzConnect subscription",
		answer: 'You can cancel your KidzConnect subscription by logging into your account, going to your settings on your dashboard, and following the cancellation process.',
	},
	{
		question: "How do the different subscriptions work",
		answer: 'We offer various subscription plans with different features and benefits. You can choose the subscription plan that best suits your needs, and it will grant you access to our premium content and features.',
	},
	{
		question: "What payment methods are accepted for subscriptions",
		answer: 'We accept major credit cards and other payment methods, which include [list], for subscription payment',
	},
	{
		question: "Are there any discounts",
		answer: 'We occasionally offer discounts and promotions. Keep an eye on our website and upcoming newsletter for updates on special offers.',
	},
	{
		question: "Can children listen to, read, or interact with KidzConnect content outside the website",
		answer: 'Currently, KidzConnect content is accessible only through our website.',
	},
	{
		question: "How does the MasterKidz game in KidzConnect work",
		answer: 'Pending.......',
	},
	{
		question: "How do kids earn more points in KidzConnect",
		answer: 'Kids can earn points by actively participating in and completing various educational activities within the KidzConnect platform.',
	},
	{
		question: "Does my child have the ability to ask questions to their parents",
		answer: 'Yes, your child can ask questions to their parents within the KidzConnect platform as part of our interactive features.',
	},
	{
		question: "How can I interact with my child's answers to questions",
		answer: "Parents can interact with their child's answers by providing feedback, encouragement, and engaging in meaningful discussions within the KidzConnect platform.",
	},
	{
		question: "Can my child repeat a theme more than once",
		answer: 'Currently, a child may only explore a theme once.',
	},
	{
		question: "How can I share my child's conversation with other family members",
		answer: "You can share your child's conversations and achievements with other family members by using our built-in sharing features, such as sharing on social media or sending links. You may also directly involve your other family members by adding them onto your subscription plan therefore giving them access to your child’s answers, conversations and fostering those greater bonds.",
	},
	{
		question: "How can I track my child's progress in the application",
		answer: "KidzConnect offers a comprehensive tracking system that allows parents to monitor their child's progress, completed activities, and areas of interest within the platform",
	},
	{
		question: "What are KidzConnect's rules and policies regarding respect and safety",
		answer: "KidzConnect has strict rules and policies in place to ensure a safe and respectful environment for all users. Please refer to our Terms of Use and Privacy Policy for more information.",
	},
	{
		question: "How can I contact customer support",
		answer: 'You can reach our customer support team by visiting our "Contact Us" page on the website, by logging in and going onto the “Support” section of your dashboard or by emailing (support email address).',
	},
	{
		question: "How can I report a problem or bug on the website",
		answer: "If you encounter any problems or bugs on the website, please contact our customer support team for assistance through our “Contact Us” page on the website or through the “Support” section of your dashboard."
	},
	{
		question: "How can I contact the development team for questions, feedback, or technical issues",
		answer: 'For questions or feedback, you may contact us by logging in and going on the "Suggest Features"  section of your dashboard, or by emailing (feedback team email address). Your input is valuable to us',
	},
];

export default function Faq() {
	const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
	const scrollToTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};
	const handleBackClick = () => {
		setSelectedQuestionIndex(null);
	};
	const [aboutSection, setAbout] = useState(false);
	const [sections, setSections] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleAccordion = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<>
			<Header />


			{selectedQuestionIndex === null ? (
				<div className={`main-container faq_page ${sections ? '' : 'active_faq'}`}>
					<div className="container">
						<div className="faq_page_inner">

							{sections && (<>
								<div className="faq_page_head">
									<h1>How Can We Help</h1>
									<div className="faq_page_head_form">
										<img loading="lazy" src={search_keywordIMG} alt="logo" />
										<input className="form-control mr-sm-2" type="search" placeholder="Search keyword" aria-label="Search" />
									</div>
								</div>
								<div className='faq_page_inner_sections'>
										<div className='faq_page_inner_items' onClick={() => { setAbout(true); setSections(false) }}>
											<img src={aboutimg} />
											<h5>About KidzConnect</h5>
										</div>
										<div className='faq_page_inner_items'>
											<img src={policiesimg} />
											<h5>Policies and Support</h5>
										</div>
										<div className='faq_page_inner_items'>
											<img src={accountimg} />
											<h5>Account and Profile Management</h5>
										</div>
									
									<div className='faq_page_inner_items'>
										<img src={subscriptionimg} />
										<h5>Subscriptions and Pricing</h5>
									</div>
								</div></>)}
							{aboutSection && !sections && (<><div className="faq_row_item">
								<div className="FrequentlyAsked_content">
									<p className='navlink_Page'><a onClick={() => { setSections(true); }}>FAQ</a> {'>'} About KidzConnect</p>
									<h2>About KidzConnect</h2>
									<ul>
										<li>
											<Accordion title="What is KidzConnect?" content="KidzConnect, made by parents for parents, is a platform dedicated to providing an interactive and educational space for children while strengthening the parent-child bond. It offers a wide range of engaging stories, activities, and opportunities for kids to learn, be heard and have fun. Parents can join in, too, by sharing in their children's learning journey and creating lasting memories together. KidzConnect aims to innovate the way we preserve cherished moments by incorporating sound while making learning enjoyable, all while fostering meaningful family connections." />
										</li>
										<li>
											<Accordion title="Is the KidzConnect environment safe and secure for children?" content="We understand how as a parent you’d have concerns about your children’s safety online. At KidzConnect, we prioritize the safety and security of children using our platform. We have implemented robust parental control solutions to create a secure environment where you will have complete control over your children's conversations and activity, ensuring their online safety." />
										</li>
										<li>
											<Accordion title="How old do I have to be to use KidzConnect?" content="KidzConnect is designed for children aged 7 to 12 years old." />
										</li>
										<li>
											<Accordion title="Is KidzConnect available on mobile?" content="Yes, KidzConnect is accessible through mobile devices with an internet connection." />
										</li>
										<li>
											<Accordion title="Is KidzConnect available in multiple languages?" content="Currently, KidzConnect is available in the following 5 languages: English, French, Spanish, Portuguese and German." />
										</li>
										<li>
											<Accordion title="How do I create an account on KidzConnect?" content="To create an account on KidzConnect, simply click onto the login button on the top right of our website's landing page and follow the easy registration process." />
										</li>
										<li>
											<Accordion title="How can I register multiple children with a single email address?" content="Each child can have their own KidzConnect account linked to a single parent email address. During the registration process, you can add multiple child profiles, the exact amount depending on your selected subscription plan. Click here for more details about all our subscription plans." />
										</li>
										<li>
											<Accordion title="How can I modify my profile information?" content="You can edit your profile information by logging into your KidzConnect account, going to your profile settings on your dashboard, and making the desired changes." />
										</li>
										<li>
											<Accordion title="How can I recover my password if I forget it?" content="If you forget your password, simply click on the 'Forgot Password' link on the login page. We will send you instructions on how to reset your password via your email address." />
										</li>
										<li>
											<Accordion title="How can I cancel my KidzConnect subscription?" content="You can cancel your KidzConnect subscription by logging into your account, going to your settings on your dashboard, and following the cancellation process." />
										</li>
										<li>
											<Accordion title="How do the different subscriptions work?" content="We offer various subscription plans with different features and benefits. You can choose the subscription plan that best suits your needs, and it will grant you access to our premium content and features." />
										</li>
										<li>
											<Accordion title="What payment methods are accepted for subscriptions?" content="We accept major credit cards and other payment methods, which include [list], for subscription payment." />
										</li>
										<li>
											<Accordion title="Are there any discounts?" content="We occasionally offer discounts and promotions. Keep an eye on our website and upcoming newsletter for updates on special offers." />
										</li>
										<li>
											<Accordion title="Can children listen to, read, or interact with KidzConnect content outside the website?" content="Currently, KidzConnect content is accessible only through our website." />
										</li>
										<li>
											<Accordion title="How does the MasterKidz game in KidzConnect work?" content="Pending......." />
										</li>
										<li>
											<Accordion title="How do kids earn more points in KidzConnect?" content="Kids can earn points by actively participating in and completing various educational activities within the KidzConnect platform." />
										</li>
										<li>
											<Accordion title="Does my child have the ability to ask questions to their parents?" content="Yes, your child can ask questions to their parents within the KidzConnect platform as part of our interactive features." />
										</li>
										<li>
											<Accordion title="How can I interact with my child's answers to questions?" content="Parents can interact with their child's answers by providing feedback, encouragement, and engaging in meaningful discussions within the KidzConnect platform." />
										</li>
										<li>
											<Accordion title="Can my child repeat a theme more than once?" content="Currently, a child may only explore a theme once." />
										</li>
										<li>
											<Accordion title="How can I share my child's conversation with other family members?" content="You can share your child's conversations and achievements with other family members by using our built-in sharing features, such as sharing on social media or sending links. You may also directly involve your other family members by adding them onto your subscription plan therefore giving them access to your child’s answers, conversations and fostering those greater bonds." />
										</li>
										<li>
											<Accordion title="How can I track my child's progress in the application?" content="KidzConnect offers a comprehensive tracking system that allows parents to monitor their child's progress, completed activities, and areas of interest within the platform." />
										</li>
										<li>
											<Accordion title="What are KidzConnect's rules and policies regarding respect and safety?" content="KidzConnect has strict rules and policies in place to ensure a safe and respectful environment for all users. Please refer to our Terms of Use and Privacy Policy for more information." />
										</li>
										<li>
											<Accordion title="How can I contact customer support?" content="You can reach our customer support team by visiting our 'Contact Us' page on the website, by logging in and going onto the 'Support' section of your dashboard or by emailing (support email address)." />
										</li>
										<li>
											<Accordion title="How can I report a problem or bug on the website?" content="If you encounter any problems or bugs on the website, please contact our customer support team for assistance through our 'Contact Us' page on the website or through the 'Support' section of your dashboard." />
										</li>
										<li>
											<Accordion title="How can I contact the development team for questions, feedback, or technical issues?" content="For questions or feedback, you may contact us by logging in and going on the 'Suggest Features' section of your dashboard, or by emailing (feedback team email address). Your input is valuable to us." />
										</li>
									</ul>

								</div>
							</div></>)}

						</div>
					</div>
				</div>


			) : (


				<div className="question-content answer-faq-inr">
					<div class="container">
						<div className="question-content_left">
							<div className="question-content">
								<div className="question-content_left">
									<button className="back-button" onClick={handleBackClick}>
										<img loading="lazy" src={circle_chev_BACKIMG} alt="logo" />
									</button>


								</div>
								<div className="question-content_right">
									<h2>{Answers[selectedQuestionIndex].question}</h2>

									<p>{Answers[selectedQuestionIndex].answer}</p>
								</div>
							</div>


						</div>
					</div>
				</div>
			)}
			<Footer />
		</>
	);
}