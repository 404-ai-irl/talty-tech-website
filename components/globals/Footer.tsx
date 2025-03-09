import React from 'react';

function thisYear() {
    return new Date().getFullYear();
} 

const Footer: React.FC = () => {

    return (
        <footer className="w-full py-4 border-t">
            <div className="container mx-auto flex">
                <p className="text-sm">
                    &copy; {thisYear()} Talty Tech. All Rights Reserved. 
                </p>
            </div>
        </footer>
    );
};

export default Footer;