dayjs.extend(window.dayjs_plugin_customParseFormat);

const contacts = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            },
            {
                date: '11/01/2020 10:04:40',
                message: 'Hai raccolto i panni stesi?',
                status: 'sent'
            },
            {
                date: '11/01/2020 10:23:54',
                message: 'Cavolo mi sono scordato',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novit???',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
];

const app = new Vue(
    {
        el : '#root',
        data: {
            currentChat:0,
            chatListFilter:'',
            contextMenu: {
                show: false,
                index: 0
            },
            contacts: contacts,
        },
        computed: {
            currentChatObj: function () {
                return this.contacts[this.currentChat]
            },
        },
        methods: {
            switchCurrentChat: function(index) {
                this.currentChat = index;
            },
            sendMessage: function(){
                if (this.contacts[this.currentChat].currentInput) {
                    let messageToSend = {};
                    messageToSend.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
                    messageToSend.message = this.contacts[this.currentChat].currentInput;
                    messageToSend.status = 'sent';
                    this.contacts[this.currentChat].messages.push(messageToSend);
                    this.contacts[this.currentChat].currentInput = '';
                    setTimeout(() => {
                        let messageReply = {
                            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                            message:'ok',
                            status:'received'}
                        this.contacts[this.currentChat].messages.push(messageReply);
                    }, 1000);
                }
            },
            toggleVisible: function() {
                this.contacts.forEach(element => {
                    element.name.toLowerCase().includes(this.chatListFilter.toLowerCase()) ? element.visible = true : element.visible = false;
                });
            },
            toggleMenu: function (e,index) {
                if (index !== undefined) {
                    this.contextMenu.show = !this.contextMenu.show;
                    this.contextMenu.index = index;
                    e.stopPropagation();
                }
                else {
                    this.contextMenu.show = false;
                }
            },
            deleteMessage: function(index) {
                this.currentChatObj.messages.splice(index,1);
            },
            isSameDate: function (dateA,dateB) {
                let parsedA = dayjs(dateA, 'DD/MM/YYYY HH:mm:ss');
                let parsedB = dayjs(dateB, 'DD/MM/YYYY HH:mm:ss');
                return parsedA.format('DD/MM/YYYY') === parsedB.format('DD/MM/YYYY');
            },
            getDate: function(date){
                return dayjs(date,'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY');
            },
            getHHMM: function(date){
                return dayjs(date,'DD/MM/YYYY HH:mm:ss').format('HH:mm');
            },
        },
        created() {
            // alla creazione dell'istanza Vue, aggiungiamo la key 'currentInput' a tutti i contatti.
            this.contacts.forEach(element => {
                Vue.set(element, 'currentInput', '');
            });
        }
    }
)

