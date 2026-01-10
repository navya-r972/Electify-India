// @desc    Process chat message
// @route   POST /api/chat/message
// @access  Public
const chatMessage = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const lowerMessage = message.toLowerCase();
        let response = "";

        // Simple rule-based logic for now (same as frontend)
        if (lowerMessage.includes('what') && lowerMessage.includes('onoe')) {
            response = "One Nation One Election (ONOE) refers to the idea of holding simultaneous elections to the Lok Sabha (Parliament) and all State Legislative Assemblies across India. Currently, elections are held separately at different times.";
        } else if (lowerMessage.includes('history') || lowerMessage.includes('when')) {
            response = "India actually had simultaneous elections from 1951 to 1967. The cycle broke due to premature dissolution of some state assemblies and the Lok Sabha. The idea has been revived in recent years with reports from the Law Commission and NITI Aayog.";
        } else if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage')) {
            response = "Proponents argue that ONOE could: 1) Reduce election costs significantly, 2) Allow for more continuous governance by reducing the frequency of the Model Code of Conduct, and 3) Improve administrative efficiency by consolidating resources.";
        } else if (lowerMessage.includes('concern') || lowerMessage.includes('problem') || lowerMessage.includes('challenge')) {
            response = "Critics raise several concerns: 1) It could undermine India's federal structure by reducing focus on state-specific issues, 2) Managing simultaneous elections across India presents enormous logistical challenges, and 3) Less frequent elections could reduce democratic accountability.";
        } else if (lowerMessage.includes('constitution') || lowerMessage.includes('legal') || lowerMessage.includes('law')) {
            response = "The Indian Constitution doesn't explicitly mandate or prohibit simultaneous elections. Articles 83 and 172 specify the five-year term for Lok Sabha and State Assemblies. Implementing ONOE would likely require constitutional amendments, particularly regarding dissolution of assemblies and handling of hung assemblies.";
        } else if (lowerMessage.includes('cost') || lowerMessage.includes('money') || lowerMessage.includes('expensive')) {
            response = "While ONOE may reduce election costs, the exact savings are debated. Some claim savings of ₹1 lakh crore annually, but independent estimates suggest the actual savings would likely be lower. The Election Commission's expenditure varies significantly between elections.";
        } else {
            response = "That's an interesting question! For detailed information, I recommend checking our Learning Modules or Fact-Checking sections. You can also ask me about specific aspects like history, benefits, concerns, or constitutional aspects of ONOE.";
        }

        res.status(200).json({ response });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { chatMessage };
