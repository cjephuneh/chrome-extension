export const styles = {
    chatWithMeButton: {
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        borderRadius: '50%',
        // Background 
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWEqDo15s2Hm4fBd2kHsg1mf6mkGJ3jOLN0w&usqp=CAU)`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '84px',
        // Size
        width: '64px',
        height: '64px',
    },
    avatarHello: { 
        // Position
        position: 'absolute', 
        left: 'calc(-100% - 44px - 28px)', 
        top: 'calc(50% - 24px)', 
        // Layering
        zIndex: '10', 
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        padding: '10px 10px 10px 14px',
        borderRadius: '24px', 
        // Color
        backgroundColor: '#f9f0ff',
        color: 'black',
    },
    supportWindow: {
        // Position
        position: 'fixed',
        bottom: '116px',
        right: '24px',
        // Size
        width: '520px',
        height: '740px',
        maxWidth: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
        
        backgroundColor: 'white',
        // Border
        borderRadius: '12px',
        border: `2px solid #7a39e0`,
        overflow: 'auto',
        // Shadow
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        overflow: 'hidden',
    
    },
    emailFormWindow: { 
        width: '100%',  
        overflow: 'hidden',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    },
    stripe: {
        position: 'relative',
        top: '-50px',
        width: '100%',
        height: '308px',
        backgroundColor: '#20b2aa',
        transform: 'skewY(-12deg)',
    },
    topText: { 
        position: 'relative',
        width: '100%', 
        top: '-50%', 
        color: 'white', 
        fontSize: '24px', 
        fontWeight: '600',
    },
    emailInput: { 
        width: '66%',
        textAlign: 'center',
        outline: 'none',
        padding: '12px',
        borderRadius: '12px',
        border: '2px solid #7a39e0',
    },
    bottomText: { 
        position: 'absolute', 
        width: '100%', 
        top: '-3%', 
        color: '#7a39e0', 
        fontSize: '24px', 
        fontWeight: '600' 
    },
    loadingDiv: { 
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        textAlign: 'center', 
        backgroundColor: 'white',
    },
    loadingIcon: { 
        color: '#7a39e0', 
        position: 'absolute', 
        top: 'calc(50% - 51px)', 
        left: 'calc(50% - 51px)',  
        fontWeight: '600',
    },
    chatEngineWindow: {
        width: '100%',  
        backgroundColor: '#fff',
    },
    
    enterButtonn: {
        backgroundColor: 'blue',
        color: '#fff', 
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '20px',
           
    },

    

   
}