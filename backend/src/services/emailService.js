import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const getRSVPConfirmationTemplate = (rsvp) => {
    const guestList = rsvp.guests.map(g => {
        const attending = [];
        if (g.attendingAnandKaraj) attending.push('Anand Karaj');
        if (g.attendingReception) attending.push('Reception');
        
        return `
            <div style="padding: 15px 0; border-bottom: 1px solid rgba(161, 108, 86, 0.1);">
                <div style="font-weight: 600; color: #2A0306; display: flex; justify-content: space-between; align-items: center;">
                    <span>${g.name}</span>
                    ${g.isChild ? `<span style="font-size: 11px; background-color: #f7ede2; color: #a16c56; padding: 2px 8px; border-radius: 10px;">CHILD (Age: ${g.age})</span>` : ''}
                </div>
                <div style="font-size: 13px; color: #A16C56; margin-top: 5px;">
                    Attending: ${attending.length > 0 ? attending.join(', ') : 'Not Attending'}
                </div>
                ${g.foodPreference ? `<div style="font-size: 12px; color: #888; margin-top: 2px;">Dietary: ${g.foodPreference}</div>` : ''}
            </div>
        `;
    }).join('');
    
    // Calculate total attendees per event
    const akCount = rsvp.guests.filter(g => g.attendingAnandKaraj).length;
    const recCount = rsvp.guests.filter(g => g.attendingReception).length;
    
    const summaryList = [];
    if (akCount > 0) summaryList.push(`${akCount} guest(s) for Anand Karaj`);
    if (recCount > 0) summaryList.push(`${recCount} guest(s) for Reception`);
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>RSVP Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f7f5f0;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f5f0; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #E5E1C7; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                        <!-- Floral Header Style -->
                        <tr>
                            <td style="background-color: #2A0306; padding: 60px 40px; text-align: center;">
                                <div style="color: #E5E1C7; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px;">Save the Date</div>
                                <h1 style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 48px; color: #E5E1C7; margin: 0; font-weight: normal; letter-spacing: 2px;">Mehak & Simarpal</h1>
                                <div style="width: 60px; height: 1px; background-color: #A16C56; margin: 30px auto;"></div>
                                <div style="color: #D4B99D; font-size: 18px; letter-spacing: 1px;">August 28 & 29, 2026 • Stockholm</div>
                            </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                            <td style="padding: 60px 50px;">
                                <div style="text-align: center; margin-bottom: 40px;">
                                    <h2 style="font-family: 'Playfair Display', 'Georgia', serif; font-size: 32px; color: #2A0306; margin-bottom: 15px; font-weight: normal;">See You Soon!</h2>
                                    <p style="font-size: 18px; color: #A16C56; line-height: 1.6; font-style: italic;">
                                        "Your presence would mean the world to us as we begin this new chapter of our lives."
                                    </p>
                                </div>

                                <div style="background-color: #E5E1C7; padding: 40px; border-radius: 4px; border-left: 4px solid #A16C56;">
                                    <h3 style="color: #2A0306; font-size: 18px; margin-top: 0; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Your RSVP Details</h3>
                                    
                                    <div style="margin-bottom: 25px;">
                                        <div style="color: #A16C56; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Events Attending</div>
                                        <div style="color: #2A0306; font-size: 16px; font-weight: 500;">${summaryList.join(' • ')}</div>
                                    </div>

                                    <div style="margin-bottom: 25px;">
                                        <div style="color: #A16C56; font-size: 12px; text-transform: uppercase; margin-bottom: 10px;">Guest Information</div>
                                        ${guestList}
                                    </div>

                                    <div>
                                        <div style="color: #A16C56; font-size: 12px; text-transform: uppercase; margin-bottom: 5px;">Confirmation Email</div>
                                        <div style="color: #2A0306; font-size: 14px;">${rsvp.email}</div>
                                    </div>
                                </div>

                                <div style="margin-top: 50px; text-align: center;">
                                    <p style="font-size: 16px; color: #2A0306; line-height: 1.6;">
                                        We are finalizing the arrangements and will keep you informed of any updates. 
                                        If your plans change, please let us know.
                                    </p>
                                    <div style="margin-top: 40px; font-family: 'Playfair Display', 'Georgia', serif; font-size: 24px; color: #2A0306;">
                                        With Warmest Regards,<br/>
                                        <span style="color: #A16C56;">Mehak & Simarpal</span>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #fcfbf8; padding: 40px; text-align: center; border-top: 1px solid #E5E1C7;">
                                <p style="font-size: 12px; color: #B0B0B0; margin: 0;">
                                    This is an automated confirmation of your RSVP.<br/>
                                    Questions? <a href="mailto:mehaksimarpal@gmail.com" style="color: #A16C56; text-decoration: none;">Contact Us</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

export const sendRSVPConfirmation = async (rsvp) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email credentials not set. Skipping confirmation email.');
        return;
    }

    const mailOptions = {
        from: `"Mehak & Simarpal" <${process.env.EMAIL_USER}>`,
        to: rsvp.email,
        subject: 'Confirmed: We are excited to see you! - Mehak & Simarpal',
        html: getRSVPConfirmationTemplate(rsvp)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};
