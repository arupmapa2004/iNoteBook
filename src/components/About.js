import React from "react";

function About() {

    return (
        <>
            <h1>About iNoteBook</h1>
            <strong>Welcome to iNoteBook – your personal digital notebook that keeps your thoughts, ideas, and important notes accessible and organized.</strong>
            <div className="accordion mt-4" id="accordionExample">

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            What is iNoteBook?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            iNoteBook is a powerful platform designed to help users create, update, read, and manage their notes effortlessly. Whether you're jotting down a quick thought, keeping track of a to-do list, or writing detailed project plans, iNoteBook makes it simple and convenient.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Who is iNoteBook for?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            iNoteBook is crafted for authorized users who need a reliable space to store and organize their notes. With secure access, only authorized users can add, update, or delete their notes. For others, it's a read-only experience, allowing them to view the content without making changes.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            What makes iNoteBook unique?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            iNoteBook stands out with its PDF export feature, enabling users to download and save their notes in a professional and shareable format. This way, your notes are not just confined to the app – they can be printed, shared, and archived as needed.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            The Story Behind iNoteBook
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            The inspiration behind iNoteBook comes from the need to access your personal or project-related notes anytime, anywhere. No more searching through piles of paper or scattered files on your devices. With iNoteBook, you have a centralized and accessible repository that travels with you, making it easier to stay organized and efficient.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Stay Organized, Stay Efficient
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Whether you’re a student, a professional, or someone who simply loves taking notes, iNoteBook is here to streamline your workflow. Start using iNoteBook today, and experience the ease of having your thoughts organized and accessible, anytime, anywhere.
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default About;