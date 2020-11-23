export interface SecretSantaParticipant {
    id: string;
    name: string;
    eventId: string;
    phoneNumber: string;
    giftIdeas: string;
    giftLinks: string[];
    restrictions: string[];
    linkedParticipants: SecretSantaLinkedParticipant[]
}

export interface SecretSantaLinkedParticipant {
    name: string;
    phoneNumber: string;
}