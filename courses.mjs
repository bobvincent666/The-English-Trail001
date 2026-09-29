/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} date Shanghai calendar date (YYYY-MM-DD).
 * @property {number} dayNumber
 * @property {string} phase
 * @property {string} weekday
 * @property {string} level Kids levels are not CEFR levels.
 * @property {"diagnostic"|"british-council"|"youtube"|"review"} kind
 * @property {string} title
 * @property {string} source
 * @property {number} durationMinutes Complete lesson time, including practice.
 * @property {string} url Canonical source page; YouTube watch links also serve as fallback.
 * @property {string} [videoId]
 * @property {ReadonlyArray<string>} tasks
 */

// Source URLs checked against British Council's public catalog on 2026-09-29.
// YouTube IDs come from its existing Video zone embeds; playback depends on availability.
/** @type {ReadonlyArray<Readonly<Course>>} */
export const COURSES = Object.freeze([
  {
    "id": "day-001",
    "date": "2026-09-30",
    "dayNumber": 1,
    "phase": "起点与适应",
    "weekday": "周三",
    "level": "诊断",
    "kind": "diagnostic",
    "title": "启程：我的听力起点",
    "source": "课程内测",
    "durationMinutes": 25,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/listening-practice",
    "tasks": [
      "选择一篇Level 3听力，第一遍不看文字完成",
      "第二遍记录听到的五个关键词",
      "查看Transcript并标记三处没听懂的句子",
      "用中文说出主要内容并记录初始正确率"
    ]
  },
  {
    "id": "day-002",
    "date": "2026-10-01",
    "dayNumber": 2,
    "phase": "起点与适应",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1体验：Meeting other students",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-other-students",
    "tasks": [
      "完成Preparation学科分类",
      "第一遍听出人物姓名和来源地",
      "第二遍完成Task 1和Task 2",
      "模仿录音完成30秒自我介绍"
    ]
  },
  {
    "id": "day-003",
    "date": "2026-10-02",
    "dayNumber": 3,
    "phase": "起点与适应",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：We the Digital Citizens",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=-N7lRYMmbXU",
    "tasks": [
      "第一遍关闭字幕观看，记录“网络安全”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "写出三条安全上网建议"
    ],
    "videoId": "-N7lRYMmbXU"
  },
  {
    "id": "day-004",
    "date": "2026-10-03",
    "dayNumber": 4,
    "phase": "起点与适应",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "启动周复习：认识自己与初次小测",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-other-students",
    "tasks": [
      "回顾诊断记录、自我介绍与数字安全视频，整理五个表达",
      "不看文字重听本周“Meeting other students”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-005",
    "date": "2026-10-05",
    "dayNumber": 5,
    "phase": "起点与适应",
    "weekday": "周一",
    "level": "Kids Level 3",
    "kind": "british-council",
    "title": "短故事：The lump of gold",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/lump-gold",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "写出Paul的三次选择，并说明真正让他快乐的是什么"
    ]
  },
  {
    "id": "day-006",
    "date": "2026-10-06",
    "dayNumber": 6,
    "phase": "起点与适应",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 01：They meet",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-01-they-meet",
    "tasks": [
      "第一遍观看，记录人物、地点和相遇经过",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-007",
    "date": "2026-10-07",
    "dayNumber": 7,
    "phase": "起点与适应",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 01精听复述：They meet",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-01-they-meet",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-008",
    "date": "2026-10-08",
    "dayNumber": 8,
    "phase": "起点与适应",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：The first English class",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/first-english-class",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出教室、上课时间和课程日期",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "用四句话介绍自己的英语课时间表"
    ]
  },
  {
    "id": "day-009",
    "date": "2026-10-09",
    "dayNumber": 9,
    "phase": "起点与适应",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Facts about bumblebees",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=OxDEO1cVyqg",
    "tasks": [
      "第一遍关闭字幕观看，记录“蜜蜂与授粉”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "用四句话说明蜜蜂怎样帮助植物"
    ],
    "videoId": "OxDEO1cVyqg"
  },
  {
    "id": "day-010",
    "date": "2026-10-10",
    "dayNumber": 10,
    "phase": "起点与适应",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第02周复习：The first English class",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/first-english-class",
    "tasks": [
      "回顾本周短故事、Starting Out 01与主题视频，整理五个表达",
      "不看文字重听本周“The first English class”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-011",
    "date": "2026-10-12",
    "dayNumber": 11,
    "phase": "起点与适应",
    "weekday": "周一",
    "level": "Kids Level 3",
    "kind": "british-council",
    "title": "短故事：William Shakespeare",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/william-shakespeare",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "制作莎士比亚生平的四项时间线"
    ]
  },
  {
    "id": "day-012",
    "date": "2026-10-13",
    "dayNumber": 12,
    "phase": "起点与适应",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 02：Tom's party",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-02-toms-party",
    "tasks": [
      "第一遍观看，记录姓名、家乡、职业与电话号码",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-013",
    "date": "2026-10-14",
    "dayNumber": 13,
    "phase": "起点与适应",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 02精听复述：Tom's party",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-02-toms-party",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-014",
    "date": "2026-10-15",
    "dayNumber": 14,
    "phase": "起点与适应",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Meeting a new team member",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-new-team-member",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出新成员姓名、工作与家乡",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "给新同学录制30秒欢迎介绍"
    ]
  },
  {
    "id": "day-015",
    "date": "2026-10-16",
    "dayNumber": 15,
    "phase": "起点与适应",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Make a flick football game",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=UpO83Gw5lTs",
    "tasks": [
      "第一遍关闭字幕观看，记录“制作纸上足球游戏”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "按顺序口述制作的四个步骤，无需实际使用工具"
    ],
    "videoId": "UpO83Gw5lTs"
  },
  {
    "id": "day-016",
    "date": "2026-10-17",
    "dayNumber": 16,
    "phase": "起点与适应",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第03周复习：Meeting a new team member",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-new-team-member",
    "tasks": [
      "回顾本周短故事、Starting Out 02与主题视频，整理五个表达",
      "不看文字重听本周“Meeting a new team member”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-017",
    "date": "2026-10-19",
    "dayNumber": 17,
    "phase": "起点与适应",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：A dog's life",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/dogs-life",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "记录Dino提出的三条道路安全建议"
    ]
  },
  {
    "id": "day-018",
    "date": "2026-10-20",
    "dayNumber": 18,
    "phase": "起点与适应",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 03：What do you like doing?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-03-what-do-you-doing",
    "tasks": [
      "第一遍观看，记录两人的爱好和邀请结果",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-019",
    "date": "2026-10-21",
    "dayNumber": 19,
    "phase": "起点与适应",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 03精听复述：What do you like doing?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-03-what-do-you-doing",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-020",
    "date": "2026-10-22",
    "dayNumber": 20,
    "phase": "起点与适应",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Finding the library",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/finding-library",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出图书馆位置与开放时间",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "画出路线并口头说明怎样到图书馆"
    ]
  },
  {
    "id": "day-021",
    "date": "2026-10-23",
    "dayNumber": 21,
    "phase": "起点与适应",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：How to make chocolate mud pies with Tilly Ramsay",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=PMreviyWj2I",
    "tasks": [
      "第一遍关闭字幕观看，记录“食物与制作步骤”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "记录三种材料和三个步骤，无需实际烹饪"
    ],
    "videoId": "PMreviyWj2I"
  },
  {
    "id": "day-022",
    "date": "2026-10-24",
    "dayNumber": 22,
    "phase": "起点与适应",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第04周复习：Finding the library",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/finding-library",
    "tasks": [
      "回顾本周短故事、Starting Out 03与主题视频，整理五个表达",
      "不看文字重听本周“Finding the library”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-023",
    "date": "2026-10-26",
    "dayNumber": 23,
    "phase": "起点与适应",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：The animal shelter",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/animal-shelter",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "用三句话比较家人各自想选的宠物"
    ]
  },
  {
    "id": "day-024",
    "date": "2026-10-27",
    "dayNumber": 24,
    "phase": "起点与适应",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 04：Where are you?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-04-where-are-you",
    "tasks": [
      "第一遍观看，记录地点、方向与购物约定",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-025",
    "date": "2026-10-28",
    "dayNumber": 25,
    "phase": "A1核心训练",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 04精听复述：Where are you?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-04-where-are-you",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-026",
    "date": "2026-10-29",
    "dayNumber": 26,
    "phase": "A1核心训练",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Ordering in a café",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/ordering-cafe",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出食物、饮料和价格",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "表演包含点餐和价格的四句对话"
    ]
  },
  {
    "id": "day-027",
    "date": "2026-10-30",
    "dayNumber": 27,
    "phase": "A1核心训练",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Robots that cook, clean and chat",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=HeTPuCDRaag",
    "tasks": [
      "第一遍关闭字幕观看，记录“机器人与日常生活”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "列出机器人的四项能力并说出自己的一个设计想法"
    ],
    "videoId": "HeTPuCDRaag"
  },
  {
    "id": "day-028",
    "date": "2026-10-31",
    "dayNumber": 28,
    "phase": "A1核心训练",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第05周复习：Ordering in a café",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/ordering-cafe",
    "tasks": [
      "回顾本周短故事、Starting Out 04与主题视频，整理五个表达",
      "不看文字重听本周“Ordering in a café”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-029",
    "date": "2026-11-02",
    "dayNumber": 29,
    "phase": "A1核心训练",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：Dinosaur Dig",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/dinosaur-dig",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "按顺序讲述Sonia进入游戏后的三件事"
    ]
  },
  {
    "id": "day-030",
    "date": "2026-11-03",
    "dayNumber": 30,
    "phase": "A1核心训练",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 05：Speaking or eating?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-05-speaking-or-eating",
    "tasks": [
      "第一遍观看，记录餐厅里两人无法顺利交流的原因",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-031",
    "date": "2026-11-04",
    "dayNumber": 31,
    "phase": "A1核心训练",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 05精听复述：Speaking or eating?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-05-speaking-or-eating",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-032",
    "date": "2026-11-05",
    "dayNumber": 32,
    "phase": "A1核心训练",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Shopping for clothes",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/shopping-clothes",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出衣服颜色、尺码与价格",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "用四句对话完成一次模拟买衣服"
    ]
  },
  {
    "id": "day-033",
    "date": "2026-11-06",
    "dayNumber": 33,
    "phase": "A1核心训练",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：The zoo powered by poo",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=dDvK9i1ryJo",
    "tasks": [
      "第一遍关闭字幕观看，记录“动物园与清洁能源”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "用first、then、finally解释废物变成能源的过程"
    ],
    "videoId": "dDvK9i1ryJo"
  },
  {
    "id": "day-034",
    "date": "2026-11-07",
    "dayNumber": 34,
    "phase": "A1核心训练",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第06周复习：Shopping for clothes",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/shopping-clothes",
    "tasks": [
      "回顾本周短故事、Starting Out 05与主题视频，整理五个表达",
      "不看文字重听本周“Shopping for clothes”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-035",
    "date": "2026-11-09",
    "dayNumber": 35,
    "phase": "A1核心训练",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：My secret team",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/my-secret-team",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "写出男孩喜欢球队的三个理由，并介绍自己的爱好"
    ]
  },
  {
    "id": "day-036",
    "date": "2026-11-10",
    "dayNumber": 36,
    "phase": "A1核心训练",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 06：I'll pay",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-06-ill-pay",
    "tasks": [
      "第一遍观看，记录付款问题和解决办法",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-037",
    "date": "2026-11-11",
    "dayNumber": 37,
    "phase": "A1核心训练",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 06精听复述：I'll pay",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-06-ill-pay",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-038",
    "date": "2026-11-12",
    "dayNumber": 38,
    "phase": "A1核心训练",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Booking a table",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/booking-table",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出预订时间、人数与姓名",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "录制一段餐厅预订电话对话"
    ]
  },
  {
    "id": "day-039",
    "date": "2026-11-13",
    "dayNumber": 39,
    "phase": "A1核心训练",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Leaping ducklings",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=1wnZ5e4iJC8",
    "tasks": [
      "第一遍关闭字幕观看，记录“小动物的成长”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "按顺序描述鸭宝宝面临的挑战和结果"
    ],
    "videoId": "1wnZ5e4iJC8"
  },
  {
    "id": "day-040",
    "date": "2026-11-14",
    "dayNumber": 40,
    "phase": "A1核心训练",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第07周复习：Booking a table",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/booking-table",
    "tasks": [
      "回顾本周短故事、Starting Out 06与主题视频，整理五个表达",
      "不看文字重听本周“Booking a table”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-041",
    "date": "2026-11-16",
    "dayNumber": 41,
    "phase": "A1核心训练",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：One moment around the world",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/one-moment-around-world",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "做一张三个城市的时间与活动对照表"
    ]
  },
  {
    "id": "day-042",
    "date": "2026-11-17",
    "dayNumber": 42,
    "phase": "A1核心训练",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 07：A race",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-07-race",
    "tasks": [
      "第一遍观看，记录两人的运动爱好和比赛结果",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-043",
    "date": "2026-11-18",
    "dayNumber": 43,
    "phase": "A1核心训练",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 07精听复述：A race",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-07-race",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-044",
    "date": "2026-11-19",
    "dayNumber": 44,
    "phase": "A1核心训练",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：A voicemail message",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/voicemail-message",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出留言人、时间与回电要求",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "写下三项留言信息并录制20秒回电"
    ]
  },
  {
    "id": "day-045",
    "date": "2026-11-20",
    "dayNumber": 45,
    "phase": "A1核心训练",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Make an astronaut helmet",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=uNZ9r_KfJ9A",
    "tasks": [
      "第一遍关闭字幕观看，记录“太空与手工指令”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "画一张头盔草图并口头说明三个制作步骤"
    ],
    "videoId": "uNZ9r_KfJ9A"
  },
  {
    "id": "day-046",
    "date": "2026-11-21",
    "dayNumber": 46,
    "phase": "A1核心训练",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第08周复习：A voicemail message",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/voicemail-message",
    "tasks": [
      "回顾本周短故事、Starting Out 07与主题视频，整理五个表达",
      "不看文字重听本周“A voicemail message”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-047",
    "date": "2026-11-23",
    "dayNumber": 47,
    "phase": "A1核心训练",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：Planet Earth",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/planet-earth",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "列出片中的四种自然环境及两项保护措施"
    ]
  },
  {
    "id": "day-048",
    "date": "2026-11-24",
    "dayNumber": 48,
    "phase": "A1核心训练",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 08：Brown bread",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-08-brown-bread",
    "tasks": [
      "第一遍观看，记录点餐要求与顾客不满意的原因",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-049",
    "date": "2026-11-25",
    "dayNumber": 49,
    "phase": "A1核心训练",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 08精听复述：Brown bread",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-08-brown-bread",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-050",
    "date": "2026-11-26",
    "dayNumber": 50,
    "phase": "A1核心训练",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Meeting people at a dinner",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-people-dinner",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出人物关系、职业与介绍顺序",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "用三个问题模拟聚餐时认识新朋友"
    ]
  },
  {
    "id": "day-051",
    "date": "2026-11-27",
    "dayNumber": 51,
    "phase": "A1核心训练",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：One in a million plastic pick-up",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=CRRX-PBeCU4",
    "tasks": [
      "第一遍关闭字幕观看，记录“塑料与环保”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "写出自己一周可以完成的两项减塑行动"
    ],
    "videoId": "CRRX-PBeCU4"
  },
  {
    "id": "day-052",
    "date": "2026-11-28",
    "dayNumber": 52,
    "phase": "A1核心训练",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第09周复习：Meeting people at a dinner",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-people-dinner",
    "tasks": [
      "回顾本周短故事、Starting Out 08与主题视频，整理五个表达",
      "不看文字重听本周“Meeting people at a dinner”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-053",
    "date": "2026-11-30",
    "dayNumber": 53,
    "phase": "A1核心训练",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：Isaac Newton",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/isaac-newton",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "讲述牛顿观察到的现象与提出的问题"
    ]
  },
  {
    "id": "day-054",
    "date": "2026-12-01",
    "dayNumber": 54,
    "phase": "A1核心训练",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 09：Family photos",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-09-family-photos",
    "tasks": [
      "第一遍观看，记录照片中人物的家庭关系",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-055",
    "date": "2026-12-02",
    "dayNumber": 55,
    "phase": "A1完成与A2桥接",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 09精听复述：Family photos",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-09-family-photos",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-056",
    "date": "2026-12-03",
    "dayNumber": 56,
    "phase": "A1完成与A2桥接",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Organising a group project",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/organising-group-project",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出项目任务、分工与截止时间",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "写出自己的小组项目三项分工"
    ]
  },
  {
    "id": "day-057",
    "date": "2026-12-04",
    "dayNumber": 57,
    "phase": "A1完成与A2桥接",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Roald Dahl quick bio",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=qcOj8PsRx60",
    "tasks": [
      "第一遍关闭字幕观看，记录“作家与成长经历”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "制作Roald Dahl生平的四项时间线"
    ],
    "videoId": "qcOj8PsRx60"
  },
  {
    "id": "day-058",
    "date": "2026-12-05",
    "dayNumber": 58,
    "phase": "A1完成与A2桥接",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第10周复习：Organising a group project",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/organising-group-project",
    "tasks": [
      "回顾本周短故事、Starting Out 09与主题视频，整理五个表达",
      "不看文字重听本周“Organising a group project”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-059",
    "date": "2026-12-07",
    "dayNumber": 59,
    "phase": "A1完成与A2桥接",
    "weekday": "周一",
    "level": "Kids 短故事",
    "kind": "british-council",
    "title": "短故事：Record breakers",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/record-breakers",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "记录三项纪录中的数字，并用比较句讲述"
    ]
  },
  {
    "id": "day-060",
    "date": "2026-12-08",
    "dayNumber": 60,
    "phase": "A1完成与A2桥接",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 10：Sportsman",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-10-sportsman",
    "tasks": [
      "第一遍观看，记录运动名称与Julia的反应",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-061",
    "date": "2026-12-09",
    "dayNumber": 61,
    "phase": "A1完成与A2桥接",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 10精听复述：Sportsman",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-10-sportsman",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-062",
    "date": "2026-12-10",
    "dayNumber": 62,
    "phase": "A1完成与A2桥接",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：Business cards",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/business-cards",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出姓名、职业与联系方式",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "设计一张虚构名片并用三句话介绍"
    ]
  },
  {
    "id": "day-063",
    "date": "2026-12-11",
    "dayNumber": 63,
    "phase": "A1完成与A2桥接",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Ten-year-old chess champion Tani",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=7mHOOdeUB28",
    "tasks": [
      "第一遍关闭字幕观看，记录“棋类与坚持练习”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "用四句话介绍Tani的经历及他的学习态度"
    ],
    "videoId": "7mHOOdeUB28"
  },
  {
    "id": "day-064",
    "date": "2026-12-12",
    "dayNumber": 64,
    "phase": "A1完成与A2桥接",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第11周复习：Business cards",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/business-cards",
    "tasks": [
      "回顾本周短故事、Starting Out 10与主题视频，整理五个表达",
      "不看文字重听本周“Business cards”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-065",
    "date": "2026-12-14",
    "dayNumber": 65,
    "phase": "A1完成与A2桥接",
    "weekday": "周一",
    "level": "Kids 短故事",
    "kind": "british-council",
    "title": "短故事：Pyramids in Paris",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/pyramids-paris",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "按顺序记录三个地点，并复述旅行经过"
    ]
  },
  {
    "id": "day-066",
    "date": "2026-12-15",
    "dayNumber": 66,
    "phase": "A1完成与A2桥接",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 11：What time is it?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-11-what-time-it",
    "tasks": [
      "第一遍观看，记录约定时间、等待时间与迟到原因",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-067",
    "date": "2026-12-16",
    "dayNumber": 67,
    "phase": "A1完成与A2桥接",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 11精听复述：What time is it?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-11-what-time-it",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-068",
    "date": "2026-12-17",
    "dayNumber": 68,
    "phase": "A1完成与A2桥接",
    "weekday": "周四",
    "level": "A1",
    "kind": "british-council",
    "title": "A1听力：A request from your boss",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/request-your-boss",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出要完成的事情、时间与顺序",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "把听到的要求改写为班级活动的三项待办"
    ]
  },
  {
    "id": "day-069",
    "date": "2026-12-18",
    "dayNumber": 69,
    "phase": "A1完成与A2桥接",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Aardman Animation teaches schools about child refugees",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=RUs7GNvZLKI",
    "tasks": [
      "第一遍关闭字幕观看，记录“友谊与接纳”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "描述动画中的新朋友遇到的问题及帮助方法"
    ],
    "videoId": "RUs7GNvZLKI"
  },
  {
    "id": "day-070",
    "date": "2026-12-19",
    "dayNumber": 70,
    "phase": "A1完成与A2桥接",
    "weekday": "周六",
    "level": "A1",
    "kind": "review",
    "title": "第12周复习：A request from your boss",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a1/request-your-boss",
    "tasks": [
      "回顾本周短故事、Starting Out 11与主题视频，整理五个表达",
      "不看文字重听本周“A request from your boss”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-071",
    "date": "2026-12-21",
    "dayNumber": 71,
    "phase": "A1完成与A2桥接",
    "weekday": "周一",
    "level": "Kids 短故事",
    "kind": "british-council",
    "title": "短故事：Spycat",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/spycat",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "根据线索写出Spycat的任务和解决办法"
    ]
  },
  {
    "id": "day-072",
    "date": "2026-12-22",
    "dayNumber": 72,
    "phase": "A1完成与A2桥接",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 12：An old friend",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-12-old-friend",
    "tasks": [
      "第一遍观看，记录老朋友的身份与Julia紧张的原因",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-073",
    "date": "2026-12-23",
    "dayNumber": 73,
    "phase": "A1完成与A2桥接",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 12精听复述：An old friend",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-12-old-friend",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-074",
    "date": "2026-12-24",
    "dayNumber": 74,
    "phase": "A1完成与A2桥接",
    "weekday": "周四",
    "level": "A2",
    "kind": "british-council",
    "title": "A2听力：An invitation to a party",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/invitation-party",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出聚会地点、路线与到达时间",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "画出路线并复述邀请中的关键安排"
    ]
  },
  {
    "id": "day-075",
    "date": "2026-12-25",
    "dayNumber": 75,
    "phase": "A1完成与A2桥接",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Let's talk about black history",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=slSqk-K1Qe8",
    "tasks": [
      "第一遍关闭字幕观看，记录“历史人物与梦想”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "介绍视频中的一位人物并说出自己的未来梦想"
    ],
    "videoId": "slSqk-K1Qe8"
  },
  {
    "id": "day-076",
    "date": "2026-12-26",
    "dayNumber": 76,
    "phase": "A1完成与A2桥接",
    "weekday": "周六",
    "level": "A2",
    "kind": "review",
    "title": "第13周复习：An invitation to a party",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/invitation-party",
    "tasks": [
      "回顾本周短故事、Starting Out 12与主题视频，整理五个表达",
      "不看文字重听本周“An invitation to a party”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-077",
    "date": "2026-12-28",
    "dayNumber": 77,
    "phase": "A1完成与A2桥接",
    "weekday": "周一",
    "level": "Kids 短故事",
    "kind": "british-council",
    "title": "短故事：Superhero High",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/superhero-high",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "用can与cannot介绍两个角色的能力"
    ]
  },
  {
    "id": "day-078",
    "date": "2026-12-29",
    "dayNumber": 78,
    "phase": "A1完成与A2桥接",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 13：Horoscopes",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-13-horoscopes",
    "tasks": [
      "第一遍观看，记录两人的预测和看法",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-079",
    "date": "2026-12-30",
    "dayNumber": 79,
    "phase": "A2主线",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 13精听复述：Horoscopes",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-13-horoscopes",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-080",
    "date": "2026-12-31",
    "dayNumber": 80,
    "phase": "A2主线",
    "weekday": "周四",
    "level": "A2",
    "kind": "british-council",
    "title": "A2听力：Changing plans",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/changing-plans",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出原计划、修改原因和新安排",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "用五句话讲述一次周末计划的变化"
    ]
  },
  {
    "id": "day-081",
    "date": "2027-01-01",
    "dayNumber": 81,
    "phase": "A2主线",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Wondering about skin colour",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=Dk_HYAiS26I",
    "tasks": [
      "第一遍关闭字幕观看，记录“人与自然的多样性”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "用三个句子表达尊重不同外貌的朋友"
    ],
    "videoId": "Dk_HYAiS26I"
  },
  {
    "id": "day-082",
    "date": "2027-01-02",
    "dayNumber": 82,
    "phase": "A2主线",
    "weekday": "周六",
    "level": "A2",
    "kind": "review",
    "title": "第14周复习：Changing plans",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/changing-plans",
    "tasks": [
      "回顾本周短故事、Starting Out 13与主题视频，整理五个表达",
      "不看文字重听本周“Changing plans”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-083",
    "date": "2027-01-04",
    "dayNumber": 83,
    "phase": "A2主线",
    "weekday": "周一",
    "level": "Kids 短故事",
    "kind": "british-council",
    "title": "短故事：The treasure map",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/treasure-map",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "画出寻宝路线并用三个方向词说明"
    ]
  },
  {
    "id": "day-084",
    "date": "2027-01-05",
    "dayNumber": 84,
    "phase": "A2主线",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 14：Can you speak French?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-14-can-you-speak-french",
    "tasks": [
      "第一遍观看，记录度假计划和语言能力",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-085",
    "date": "2027-01-06",
    "dayNumber": 85,
    "phase": "A2主线",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 14精听复述：Can you speak French?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-14-can-you-speak-french",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-086",
    "date": "2027-01-07",
    "dayNumber": 86,
    "phase": "A2主线",
    "weekday": "周四",
    "level": "A2",
    "kind": "british-council",
    "title": "A2听力：Leaving a message",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/leaving-message",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出留言对象、原因与需要转达的信息",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "录制30秒留言，包含姓名、原因和回电要求"
    ]
  },
  {
    "id": "day-087",
    "date": "2027-01-08",
    "dayNumber": 87,
    "phase": "A2主线",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：What is International Women's Day about?",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=82YishWdbbQ",
    "tasks": [
      "第一遍关闭字幕观看，记录“平等与重要人物”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "介绍视频主题并说出一位自己尊重的女性"
    ],
    "videoId": "82YishWdbbQ"
  },
  {
    "id": "day-088",
    "date": "2027-01-09",
    "dayNumber": 88,
    "phase": "A2主线",
    "weekday": "周六",
    "level": "A2",
    "kind": "review",
    "title": "第15周复习：Leaving a message",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/leaving-message",
    "tasks": [
      "回顾本周短故事、Starting Out 14与主题视频，整理五个表达",
      "不看文字重听本周“Leaving a message”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-089",
    "date": "2027-01-11",
    "dayNumber": 89,
    "phase": "A2主线",
    "weekday": "周一",
    "level": "Kids Level 2",
    "kind": "british-council",
    "title": "短故事：Buzz and Bob's big adventure",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/buzz-bobs-big-adventure",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "比较Buzz和Bob尝试的运动，说明自己想尝试哪一项"
    ]
  },
  {
    "id": "day-090",
    "date": "2027-01-12",
    "dayNumber": 90,
    "phase": "A2主线",
    "weekday": "周二",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 15：Is there a campsite?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-15-there-campsite",
    "tasks": [
      "第一遍观看，记录营地设施、住宿偏好和问路信息",
      "第二遍完成Task 1和Task 2，并记录正确率",
      "对照Transcript整理五个常用表达",
      "跟读两组对话，并用三句话介绍剧情"
    ]
  },
  {
    "id": "day-091",
    "date": "2027-01-13",
    "dayNumber": 91,
    "phase": "A2主线",
    "weekday": "周三",
    "level": "A1",
    "kind": "british-council",
    "title": "Starting Out 15精听复述：Is there a campsite?",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out/episode-15-there-campsite",
    "tasks": [
      "选取昨日一段30–60秒对话，分三遍听并写下听到的句子",
      "对照Transcript标出三处漏听或连读",
      "逐句跟读该段两遍，再不看文字复述",
      "录制45秒剧情复述，包含昨日记录的关键信息"
    ]
  },
  {
    "id": "day-092",
    "date": "2027-01-14",
    "dayNumber": 92,
    "phase": "A2主线",
    "weekday": "周四",
    "level": "A2",
    "kind": "british-council",
    "title": "A2听力：Missing a class",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/missing-class",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出缺课原因、课程内容与需要补做的事",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "给虚构老师录制30秒请假与补课询问"
    ]
  },
  {
    "id": "day-093",
    "date": "2027-01-15",
    "dayNumber": 93,
    "phase": "A2主线",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Celebrating Holi",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 30,
    "url": "https://www.youtube.com/watch?v=wTfYhG2mOSA",
    "tasks": [
      "第一遍关闭字幕观看，记录“节日与文化”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "用四句话比较Holi和自己熟悉的一个节日"
    ],
    "videoId": "wTfYhG2mOSA"
  },
  {
    "id": "day-094",
    "date": "2027-01-16",
    "dayNumber": 94,
    "phase": "A2主线",
    "weekday": "周六",
    "level": "A2",
    "kind": "review",
    "title": "第16周复习：Missing a class",
    "source": "课程内复习 · British Council",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/missing-class",
    "tasks": [
      "回顾本周短故事、Starting Out 15与主题视频，整理五个表达",
      "不看文字重听本周“Missing a class”，记录五项信息",
      "用答案或Transcript核对五项信息，记录本周小测正确率",
      "录制60秒总结，使用三个本周表达并写出一个下周目标"
    ]
  },
  {
    "id": "day-095",
    "date": "2027-01-18",
    "dayNumber": 95,
    "phase": "A2主线",
    "weekday": "周一",
    "level": "Kids 短故事",
    "kind": "british-council",
    "title": "短故事：What will I be when I grow up?",
    "source": "British Council LearnEnglish Kids",
    "durationMinutes": 30,
    "url": "https://learnenglishkids.britishcouncil.org/listen-watch/short-stories/what-will-i-be-when-i-grow",
    "tasks": [
      "完成Preparation，整理五个故事关键词",
      "第一遍观看故事，记录人物、地点和主要问题",
      "第二遍完成Game或页面活动，核对答案并记录正确率",
      "用四句话介绍自己的未来职业和学习计划"
    ]
  },
  {
    "id": "day-096",
    "date": "2027-01-19",
    "dayNumber": 96,
    "phase": "A2主线",
    "weekday": "周二",
    "level": "A1–A2",
    "kind": "review",
    "title": "Starting Out全系列复习：15集成长路线",
    "source": "British Council LearnEnglish",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/general/video-series/starting-out",
    "tasks": [
      "从第01、08、15集各选一段，遮住文字复听",
      "每段记录人物、地点和关键信息，完成共九项信息小测",
      "用十个常用表达讲述Julia和Sammy的故事",
      "录制90秒复述，与早期录音比较并写出两个进步点"
    ]
  },
  {
    "id": "day-097",
    "date": "2027-01-20",
    "dayNumber": 97,
    "phase": "A2主线",
    "weekday": "周三",
    "level": "A2",
    "kind": "british-council",
    "title": "A2精听：Transport announcements",
    "source": "British Council LearnEnglish",
    "durationMinutes": 35,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/transport-announcements",
    "tasks": [
      "第一遍独立记录每条通知的地点、时间和变化",
      "选择一段通知逐句听写，标记数字与连读",
      "对照Transcript核对五项关键信息并记录正确率",
      "录制45秒自己的交通通知，包含时间、站台和目的地"
    ]
  },
  {
    "id": "day-098",
    "date": "2027-01-21",
    "dayNumber": 98,
    "phase": "A2主线",
    "weekday": "周四",
    "level": "A2",
    "kind": "british-council",
    "title": "A2听力：Transport announcements",
    "source": "British Council LearnEnglish",
    "durationMinutes": 30,
    "url": "https://learnenglish.britishcouncil.org/free-resources/listening/a2/transport-announcements",
    "tasks": [
      "完成Preparation，整理五个场景关键词",
      "第一遍听出站台、时间、目的地与变化信息",
      "第二遍完成Task 1和Task 2，核对Transcript并记录正确率",
      "整理三条交通通知并用四句话复述"
    ]
  },
  {
    "id": "day-099",
    "date": "2027-01-22",
    "dayNumber": 99,
    "phase": "A2主线",
    "weekday": "周五",
    "level": "Kids Level 3",
    "kind": "youtube",
    "title": "主题视频：Safer Internet Day – positive change online",
    "source": "YouTube · British Council Kids Video zone选编",
    "durationMinutes": 35,
    "url": "https://www.youtube.com/watch?v=hNzqAWiDaCY",
    "tasks": [
      "第一遍关闭字幕观看，记录“数字生活与期末总结”的三个关键词",
      "第二遍开启英文字幕，核对三项信息并整理五个表达",
      "选择20–30秒片段跟读两遍，再不看字幕复述",
      "比较现在与开学时的听力表现，并写出下学期两项目标",
      "录制60秒学期总结，说明最有用的三个表达和下一步计划"
    ],
    "videoId": "hNzqAWiDaCY"
  }
].map(course => Object.freeze({ ...course, tasks: Object.freeze(course.tasks) })));
