import styles from "./Instructions.module.css"
import createImage from "./img/01.Create.png"
import embedImage from "./img/02.Embed.png"
import linkImage from "./img/03.Link.png"
import surveyIdImage from "./img/04.SurveyID.png"

export default function Instructions() {
    return (
        <div className={styles.instructions}>
            <div className={styles.data}>
                <h2>
                    How to create your NPS Survey?
                </h2>
                <p>
                    1) Head to the <strong>create</strong> survey option. (top left of dashboard).<br/><br/>
                    2) Write a name for your survey and the questions you want to publish in your NPS form.
                </p>
                <img src={createImage} alt="create survey" text="create"/>
                <p>
                    3) Copy the link to the form and send it to your employees by email or your prefered communication platform.
                </p>
                <img src={linkImage} alt="link to form" text="linktoform"/>
                <br/><br/>
                <p>
                    <strong>NOTE:</strong> All surveys and links to forms are stored in database. Access to them through the top left bar in your dashboard.
                </p>
            </div>
            <div className={styles.data}>
                <h2>
                    How to embed your survey in your website? 
                </h2>
                <p>
                    1) Copy the embed link when creating the survey.<br/><br/>
                    2) Paste it in the HTML code of your page

                </p>
                <img src={embedImage} alt="embed form" text="embedform"/>
                <br/><br/>
                <p>
                    <strong>NOTE:</strong> All surveys and embed codes to forms are stored in database. Access to them through the top left bar in your dashboard.
                </p>
            </div>
            <div className={styles.data}>
                <h2>
                    How to delete a survey?
                </h2>
                <p>
                   Surveys can be easily deleted from the database through mongoDB ATLAS GUI. <br/><br/>
                   If this sounds like Klingon to you, just contact your system admin and ask to delete it for you. You will need to copy and paste the id of the survey, which you can find in the survey URL.<br/><br/>
                   <strong>Example</strong>
                </p>
                <img src={surveyIdImage} alt="surveyID" text="surveyID"/>
            </div>
        </div>
    )
}
