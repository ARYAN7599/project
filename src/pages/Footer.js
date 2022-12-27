import React from 'react'
import "../styles/footer.css"

export default function Footer() {
    return (
        <div>
            <section className="contact-area" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="contact-content text-center">
                                <img src="https://fufiscan.com/images/footer-2afc4ed7276d19bf730898c99a812737.svg?vsn=d" alt="logo" />
                                <p>Future's Finance is a high-end blockhain platform that incorporates artificial intelligence and other cutting-edge technologies to optimize a wide range of financial and non-financial use cases.</p>
                                <div class="hr"></div>
                                <h6>Listing</h6>
                                <h6><a href='https://latoken.com/exchange/USDT' target="_blank" id='link-color'>Latoken</a><span>|</span><a href='https://www.indoex.io/trade/FUFI_USDT' target="_blank" id='link-color-change'>Indoex</a></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <p>Copyright &copy; 2022 All Rights Reserved.</p>
            </footer>

        </div>
    )
}
