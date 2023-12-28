import {Linear} from "./val2color.js";

const App = {
    data() {
        return {
            tableData: []
        };
    },
    methods: {
        makeDate() {
            const linear = new Linear({
                min: 0,
                max: 100,
                colorList: ['rgb(109, 213, 250)', 'rgb(255, 255, 255)', 'rgb(41, 128, 185)',]
            })
            for (let i = 0; i < 66; ++i) {
                const signal = Math.floor(Math.random() * 20 + 10)
                const signalBg = linear.calcValue(signal)
                const summary = Math.floor(Math.random() * 20 + 60)
                const summaryBg = linear.calcValue(summary)
                const avg = Math.floor(Math.random() * 30 + 40)
                const avgBg = linear.calcValue(avg)
                this.tableData.push({
                    name: `name${i}`,
                    signal,
                    signalBg,
                    summary,
                    summaryBg,
                    avg,
                    avgBg
                })
            }
            console.log(this.tableData)
        }
    },
    mounted() {
        this.makeDate()
    }
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
