import React from "react"
import './index.css'
import Header from "../Header"

const HomePage = () => {
    return (<>
    <div className= "header">
                <Header />
            </div>
        <div className="home-container">
            
            <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Your Financial <br/><span className="highlight">Best Friend</span></h1>
                    <p className="subtitle-1">Track expenses like journaling, discover spending patterns, and grow your financial confidence with an app that truly cares about your money story.</p>
                    <div className="buttons">
                        <a href="/dashboard" className="btn primary">Start Your Journey →</a>
                        <a href="/dashboard" className="btn secondary">Learn More</a>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="feature">
                    <div className="icon"><span className="emoji1">🐖</span></div>
                    <div className="details">
                        <h3>Smart Tracking</h3>
                        <p>Log expenses like journaling</p>
                    </div>
                </div>
                <div className="feature">
                    <div className="icon"><span className="emoji2">📈</span></div>
                    <div className="details">
                        <h3>Insights</h3>
                        <p>Discover spending patterns</p>
                    </div>
                </div>
                <div className="feature">
                    <div className="icon"><span className="emoji3">🛡️</span></div>
                    <div className="details">
                        <h3>Secure</h3>
                        <p>Your data stays private</p>
                    </div>
                </div>
            </section>
            </div>
        </div>
    </>
    )
}

export default HomePage;