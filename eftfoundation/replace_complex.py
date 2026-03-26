import re

with open('c:\\Users\\User\\OneDrive\\Desktop\\etffoundation\\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacement = """      <section id="iyii7" class="gjs-ft-section ft-section-box" style="background: linear-gradient(180deg, #ffffff 0%, #faf8ff 100%); padding-top:40px; padding-bottom:40px;">
        <div id="ityd5" class="gjs-ft-wrapper gjs-ft-wrap-normal ft-wrapper-box">
          <h1 id="idee16" class="ftheadline" style="font-family: 'Montserrat', sans-serif; font-size:42px; font-weight:900; color:#1a1a2e; text-align:center; margin-bottom:40px;">
            <u style="color:#ff7f00; text-underline-offset: 5px;">EFT Unlocks</u> The Power, Skills &amp; Ability To Solve 150+ Complex Problems Like:<br />
          </h1>
          
          <style>
            .modern-problems-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin: 40px auto;
              max-width: 1050px;
            }
            .modern-problem-card {
              background: #ffffff;
              border-radius: 16px;
              padding: 25px 20px;
              text-align: center;
              transition: all 0.3s ease;
              border: 1px solid rgba(0,0,0,0.04);
              box-shadow: 0 6px 15px rgba(0,0,0,0.03);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .modern-problem-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 15px 35px rgba(0,0,0,0.08);
              border-color: rgba(255, 127, 0, 0.4);
            }
            .modern-problem-icon {
              width: 55px;
              height: 55px;
              margin-bottom: 20px;
              object-fit: contain;
              filter: drop-shadow(0 5px 10px rgba(0,0,0,0.05));
              transition: transform 0.3s ease;
            }
            .modern-problem-card:hover .modern-problem-icon {
              transform: scale(1.1);
            }
            .modern-problem-title {
              font-family: 'Montserrat', sans-serif;
              font-size: 16px;
              font-weight: 700;
              color: #2c3e50;
              line-height: 1.4;
            }
            @media (max-width: 900px) {
              .modern-problems-grid { grid-template-columns: repeat(2, 1fr); padding: 0 15px; }
            }
            @media (max-width: 600px) {
              .modern-problems-grid { grid-template-columns: 1fr; }
            }
          </style>

          <div class="modern-problems-grid">
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/k5mjq_512_fear.png" class="modern-problem-icon" alt="Stress &amp; Tensions" />
              <div class="modern-problem-title">Stress &amp; Tensions</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/i1mzu_512_anxiety1.png" class="modern-problem-icon" alt="Anxiety &amp; Panic Attacks" />
              <div class="modern-problem-title">Anxiety &amp; Panic Attacks</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/uxmte_512_paranoia.png" class="modern-problem-icon" alt="Fears &amp; Phobias" />
              <div class="modern-problem-title">Fears &amp; Phobias</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/a2mdm_512_insomnia.png" class="modern-problem-icon" alt="Disorders &amp; Addictions" />
              <div class="modern-problem-title">Disorders &amp; Addictions</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/aymta_512_headache.png" class="modern-problem-icon" alt="Pain" />
              <div class="modern-problem-title">Pain</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/gxmda_512_pessimistic.png" class="modern-problem-icon" alt="Negative Mindset" />
              <div class="modern-problem-title">Negative Mindset</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/mzotu_512_sad.png" class="modern-problem-icon" alt="Loneliness" />
              <div class="modern-problem-title">Loneliness</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/a4ntu_512_verbalabuse.png" class="modern-problem-icon" alt="Past Traumas &amp; Abuse" />
              <div class="modern-problem-title">Past Traumas &amp; Abuse</div>
            </div>
            <div class="modern-problem-card">
              <img src="https://img.flexifunnels.com/images/8535/a2mde_512_cry.png" class="modern-problem-icon" alt="Grief" />
              <div class="modern-problem-title">Grief</div>
            </div>
          </div>

          <div id="izah8l" class="ft_com_div ft_com_box" style="margin-top: 30px; text-align: center;">
            <a href="https://actionmasterclass.in/checkout-eft" data-popup="flexiPoup_iNwR8f" class="gjs-btn" style="background:#ff7f00 !important; color:#ffffff; border-radius:12px; box-shadow: 0 10px 20px rgba(255, 127, 0, 0.4); display: inline-block;">
              <span class="ffbtnmaintxt"><span class="ffbtntxt">Register Now Just @Rs 199</span></span>
              <span class="ffbtnsubtxt">Limited Seats| Offer Expires Soon!</span>
            </a>
          </div>
        </div>
      </section>"""

new_html = re.sub(
    r'<section id="iyii7" class="gjs-ft-section ft-section-box".*?</section>.*?</div>\s*</section>',
    replacement,
    html,
    flags=re.DOTALL
)

if html == new_html:
    print('Failed to replace! Regex didn\'t match.')
else:
    with open('c:\\Users\\User\\OneDrive\\Desktop\\etffoundation\\index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print('Success')
