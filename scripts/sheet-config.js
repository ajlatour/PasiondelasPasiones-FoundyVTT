// Base-language (English) pbta sheet config. Player-facing `label`/`description` strings are
// localized at runtime through lang/<code>.json (keys PASION.cfg.*); run `npm run lang:extract`
// after editing this file.
export const sheetConfig = {
  "rollFormula": "2d6",
  "statToggle": {
    "label": "Exhausted",
    "modifier": 0
  },
  "rollShifting": true,
  "rollResults": {
    "success": {
      "start": 10,
      "end": null,
      "label": "10+"
    },
    "partial": {
      "start": 7,
      "end": 9,
      "label": "7-9"
    },
    "failure": {
      "start": null,
      "end": 6,
      "label": "Miss"
    }
  },
  "actorTypes": {
    "character": {
      "details": {
        "biography": {
          "label": "Biography",
          "value": ""
        }
      },
      "stats": {},
      "attributes": {
        "questioncaballero": {
          "label": "Your Question",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-caballero",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "questionjefe": {
          "label": "Your Question",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-jefe",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "questionempleada": {
          "label": "Your Question",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-empleada",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "questiondona": {
          "label": "Your Question",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-dona",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "questionbelleza": {
          "label": "Your Question",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-belleza",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "questiongemelo": {
          "label": "Your Question",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-gemelo",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "apparencecaballero": {
          "label": "Look",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-caballero",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "apparencejefe": {
          "label": "Look",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-jefe",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "apparenceempleada": {
          "label": "Look",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-empleada",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "apparencedona": {
          "label": "Look",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-dona",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "apparencebelleza": {
          "label": "Look",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-belleza",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "apparencegemelo": {
          "label": "Look",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-gemelo",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "relationcaballero": {
          "label": "Relationships",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-caballero",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "relationjefe": {
          "label": "Relationships",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-jefe",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "relationempleada": {
          "label": "Relationships",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-empleada",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "relationdona": {
          "label": "Relationships",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-dona",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "relationbelleza": {
          "label": "Relationships",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-belleza",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "relationgemelo": {
          "label": "Relationships",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-gemelo",
          "limited": false,
          "position": "top",
          "type": "LongText",
          "value": ""
        },
        "pretendants": {
          "label": "Suitors",
          "description": "Mark your Love",
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-empleada",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "[Text]",
              "value": false
            },
            "1": {
              "label": "[Text]",
              "value": false
            }
          }
        },
        "reseau": {
          "label": "Your Network",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-dona",
          "limited": false,
          "position": "left",
          "type": "LongText",
          "value": ""
        },
        "etatsgemelo": {
          "label": "Conditions",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-gemelo",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "Cornered: +1 to act with desperation, -2 to demand what you deserve",
              "value": false
            },
            "1": {
              "label": "Guarded: +1 to manipulate a superior, -2 to strike out",
              "value": false
            },
            "2": {
              "label": "Driven: +1 to accuse someone of lying, -2 to express your love passionately",
              "value": false
            },
            "3": {
              "label": "Brooding: +1 to process your feelings out loud, -2 to spot something out of place",
              "value": false
            }
          }
        },
        "etatscaballero": {
          "label": "Conditions",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-caballero",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "Engrossed: +1 to spot something out of place, -2 to express your love passionately",
              "value": false
            },
            "1": {
              "label": "Cornered: +1 to act with desperation, -2 to demand what you deserve",
              "value": false
            },
            "2": {
              "label": "Vicious: +1 to strike out, -2 to process your feelings out loud",
              "value": false
            },
            "3": {
              "label": "Condemning: +1 to accuse someone of lying, -2 to manipulate a superior",
              "value": false
            }
          }
        },
        "etatsempleada": {
          "label": "Conditions",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-empleada",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "Hopeless: +1 to spot something out of place, -2 to accuse someone of lying",
              "value": false
            },
            "1": {
              "label": "Lovelorn: +1 to express your love passionately, -2 to act with desperation",
              "value": false
            },
            "2": {
              "label": "Cagey: +1 to manipulate a superior, -2 to demand what you deserve",
              "value": false
            },
            "3": {
              "label": "Introspective: +1 to process your feelings out loud, -2 to strike out",
              "value": false
            }
          }
        },
        "etatsdona": {
          "label": "Conditions",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-dona",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "Chiding: +1 to accuse someone of lying, -2 to strike out",
              "value": false
            },
            "1": {
              "label": "Righteous: +1 to demand what you deserve, -2 to manipulate a superior",
              "value": false
            },
            "2": {
              "label": "Ruminative: +1 to process your feelings out loud, -2 to express your love passionately.",
              "value": false
            },
            "3": {
              "label": "Cautious: +1 to spot something out of place, -2 to act with desperation",
              "value": false
            }
          }
        },
        "etatsbelleza": {
          "label": "Conditions",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-belleza",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "Zealous: +1 to demand what you deserve, -2 to act with desperation.",
              "value": false
            },
            "1": {
              "label": "Raging: +1 to strike out, -2 to spot something out of place.",
              "value": false
            },
            "2": {
              "label": "Lustful: +1 to express your love passionately, -2 to process your feelings out loud",
              "value": false
            },
            "3": {
              "label": "Underhanded: +1 to manipulate a superior, -2 to accuse someone of lying.",
              "value": false
            }
          }
        },
        "etatsjefe": {
          "label": "Conditions",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-jefe",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "Reactive: +1 to act with desperation, -2 to accuse someone of lying.",
              "value": false
            },
            "1": {
              "label": "Raging: +1 to strike out, -2 to spot something out of place.",
              "value": false
            },
            "2": {
              "label": "Righteous: +1 to demand what you deserve, -2 to manipulate a superior",
              "value": false
            },
            "3": {
              "label": "Lustful: +1 to express your love passionately, -2 to process your feelings out loud",
              "value": false
            }
          }
        },
        "episodesjefe": {
          "label": "Last Time On",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-jefe",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "You showed someone a moment of tender weakness",
              "value": false
            },
            "1": {
              "label": "You swore to take revenge against someone important",
              "value": false
            },
            "2": {
              "label": "You took over a business or political seat as an interim leader.",
              "value": false
            },
            "3": {
              "label": "You revealed that you know a secret truth hidden from someone",
              "value": false
            },
            "4": {
              "label": "You lost something truly valuable that you must recover",
              "value": false
            },
            "5": {
              "label": "You lost your temper and hurt one of your associates",
              "value": false
            },
            "6": {
              "label": "You tightened your grip on something until it snapped",
              "value": false
            }
          }
        },
        "episodesbelleza": {
          "label": "Last Time On",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-belleza",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "In the arms of another character, you spotted something you want to seize",
              "value": false
            },
            "1": {
              "label": "You signed a contract with a flourish-filled signature.",
              "value": false
            },
            "2": {
              "label": "You crashed into something with your gorgeous, gleaming car.",
              "value": false
            },
            "3": {
              "label": "You befriended someone dangerous and passionate.",
              "value": false
            },
            "4": {
              "label": "In a fit of rage, you threw your glass of wine in a character's face.",
              "value": false
            },
            "5": {
              "label": "You fell into the arms of a lover of lower standing.",
              "value": false
            },
            "6": {
              "label": "You slipped something into somebody's possession without them knowing",
              "value": false
            }
          }
        },
        "episodesempleada": {
          "label": "Last Time On",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-empleada",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "You came so very, very close to kissing someone you shouldn't.",
              "value": false
            },
            "1": {
              "label": "You acquired the most beautiful, elegant outfit you've ever seen.",
              "value": false
            },
            "2": {
              "label": "You pushed someone in a fit of anger and hurt them more than you wanted.",
              "value": false
            },
            "3": {
              "label": "You intercepted a letter meant for someone else.",
              "value": false
            },
            "4": {
              "label": "You witnessed something horrible but don't know who did it.",
              "value": false
            },
            "5": {
              "label": "You hid something where it will hopefully be safe",
              "value": false
            },
            "6": {
              "label": "You told a dear friend a secret that should have stayed undisclosed. ",
              "value": false
            }
          }
        },
        "episodesdona": {
          "label": "Last Time On",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "la-dona",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "You manipulated your name onto a lease, contract, or deed.",
              "value": false
            },
            "1": {
              "label": "You comforted someone in their time of need and meant it",
              "value": false
            },
            "2": {
              "label": "You handed someone a weapon with whispers of encouragement",
              "value": false
            },
            "3": {
              "label": "You shouted someone down and left them distraught",
              "value": false
            },
            "4": {
              "label": "You used your resources to buy someone out of a bad spot",
              "value": false
            },
            "5": {
              "label": "You called in a favor but nobody came to your aid",
              "value": false
            },
            "6": {
              "label": "You showed your deep, hidden feelings to someone you shouldn't have",
              "value": false
            }
          }
        },
        "episodescaballero": {
          "label": "Last Time On",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-caballero",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "You got into a scrap that you barely got out of alive",
              "value": false
            },
            "1": {
              "label": "You uncovered a letter that ties you deeply to someone",
              "value": false
            },
            "2": {
              "label": "You bare-handedly touched a weapon that has since gone missing",
              "value": false
            },
            "3": {
              "label": "You agreed to work with the authorities to trick someone.",
              "value": false
            },
            "4": {
              "label": "You spilled a piece of your sordid past, tears in your eyes.",
              "value": false
            },
            "5": {
              "label": "You spotted two people embracing through a window.",
              "value": false
            },
            "6": {
              "label": "You put in some hard work to get something fixed.",
              "value": false
            }
          }
        },
        "episodesgemelo": {
          "label": "Last Time On",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": "el-gemelo",
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "label": "You got into your twin's home and left something behind",
              "value": false
            },
            "1": {
              "label": "You fought with your twin and one of you nearly died.",
              "value": false
            },
            "2": {
              "label": "You received a large sum of money from a mysterious benefactor.",
              "value": false
            },
            "3": {
              "label": "You acquired proof of your parentage",
              "value": false
            },
            "4": {
              "label": "You were approached by someone who threatened to spill your secret.",
              "value": false
            },
            "5": {
              "label": "You watched your twin, unaware someone was watching you.",
              "value": false
            },
            "6": {
              "label": "You showed up at an event with your twin.",
              "value": false
            }
          }
        },
        "progression": {
          "label": "Advancement",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": null,
          "limited": false,
          "position": "left",
          "type": "ListMany",
          "condition": false,
          "sort": false,
          "options": {
            "0": {
              "values": {
                "0": {
                  "value": false
                },
                "1": {
                  "value": false
                }
              },
              "label": "Take a new move from your playbook."
            },
            "1": {
              "values": {
                "0": {
                  "value": false
                },
                "1": {
                  "value": false
                },
                "2": {
                  "value": false
                }
              },
              "label": "Take a move from another playbook"
            },
            "2": {
              "values": {
                "0": {
                  "value": false
                },
                "1": {
                  "value": false
                },
                "2": {
                  "value": false
                }
              },
              "label": "Change one of your conditions"
            },
            "3": {
              "label": "Replace your playbook question",
              "value": false
            },
            "4": {
              "values": {
                "0": {
                  "value": false
                },
                "1": {
                  "value": false
                },
                "2": {
                  "value": false
                }
              },
              "label": "Introduce a new NPC"
            },
            "5": {
              "values": {
                "0": {
                  "value": false
                },
                "1": {
                  "value": false
                }
              },
              "label": "Take permanent control of an existing NPC"
            }
          }
        }
      },
      "moveTypes": {
        "basic": {
          "label": "Basic Moves",
          "playbook": false,
          "creation": true
        },
        "secondaires": {
          "label": "Peripheral Moves",
          "playbook": false,
          "creation": true
        },
        "atout": {
          "label": "Asset",
          "playbook": false,
          "creation": false
        },
        "playbook": {
          "label": "Playbook Moves"
        }
      },
      "equipmentTypes": {
        "equipement": {
          "label": "Equipment"
        }
      }
    },
    "npc": {
      "details": {
        "biography": {
          "label": "Biography",
          "value": ""
        }
      },
      "attributes": {
        "accrochem": {
          "label": "Hook and Move",
          "description": null,
          "customLabel": false,
          "userLabel": false,
          "playbook": null,
          "limited": false,
          "position": "left",
          "type": "LongText",
          "value": ""
        }
      },
      "moveTypes": {
        "npcmove": {
          "label": "Move"
        }
      },
      "equipmentTypes": {
        "equipement": {
          "label": "Equipment"
        }
      }
    }
  }
};
