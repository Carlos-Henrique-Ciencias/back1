class EmailUtils {
    #regexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    #emailPartsLength = 2; 
    #maxAccountLength = 64;
    #maxAddressLength = 255;
    #maxDomainPartsLength = 63;

    isValid(email) {
        if (!email) return false;

        const emailParts = email.split('@');

        if (emailParts.length !== this.#emailPartsLength) return false;

        const account = emailParts[0];
        const address = emailParts[1];

        if (account.length > this.#maxAccountLength) return false;

        else if (address.length > this.#maxAddressLength) return false;

        const domainParts = address.split('.');

        if (domainParts.some((part) => {
            return part.length > this.#maxDomainPartsLength;
        })) return false;

        return this.#regexp.test(email);
    };
}

module.exports = new EmailUtils();