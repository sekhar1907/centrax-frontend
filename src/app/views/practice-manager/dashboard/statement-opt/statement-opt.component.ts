import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISoftwareConfig } from 'src/app/core/models/software-config.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-statement-opt',
  templateUrl: './statement-opt.component.html',
  styleUrls: ['./statement-opt.component.scss'],
})
export class StatementOptComponent {
  statementOptFormGroup: FormGroup;
  formsubmit!: boolean;
  practiceInfo: any;
  // acceptedCard: string = '';
  selectedCards: string = '';
  cardsList = ['mastercard', 'visa', 'discover', 'americanExpress']

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private store: Store,
    private PracticeManagerService: PracticeManagerService,
    public sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.statementOptFormGroup = new UntypedFormGroup({
      paymentGracePerios: new FormControl(null),
      accountBalanceAmount: new FormControl(null),
      defaultPaymentDueDate: new FormControl(null),
      highlightPrintedStatement: new FormControl(false),
      printEstimateedPortion: new FormControl(false),
      acceptedCard: new FormControl(null),
      cardsCheck: new FormGroup({
        mastercard: new FormControl(null),
        visa: new FormControl(null),
        discover: new FormControl(null),
        americanExpress: new FormControl(null)
      }),
      otherCard: new FormControl(null),
    });

    this.PracticeManagerService.getSoftwareConfig().subscribe({
      next: (res: ISoftwareConfig) => {
        this.initPatientInfoForm(res);
      },
      error: (error) => {
        if (this.sessionStorageService.get('practice-detail-data')) {
          const data = this.sessionStorageService.get('practice-detail-data');
          this.initPatientInfoForm(data);
        }
      },
    });
  }

  onCheckboxChange(event: any, card: string) {
    if (event.target.checked) {
      if (this.selectedCards === '') {
        this.selectedCards = card;
      } else {
        this.selectedCards += ', ' + card;
      }
    } else {
      this.selectedCards = this.selectedCards
        .replace(card + ', ', '')
        .replace(', ' + card, '')
        .replace(card, '');
    }
    console.log(this.selectedCards);
  }

  //  updateAcceptedCard() {
  //   const selectedCards = Object.keys(this.statementOptFormGroup.value)
  //     .filter(key => this.statementOptFormGroup[key])
  //     .join(',');
  //   this.acceptedCard = selectedCards;
  // }
  private initPatientInfoForm(practiceInfo?: any) {
    console.log('practiceInfo :', practiceInfo);

    if (practiceInfo) {
      this.practiceInfo = practiceInfo;

      this.statementOptFormGroup.patchValue(practiceInfo.statementOption);

      const { acceptedCard } = practiceInfo.statementOption;
      if (acceptedCard) {
        let cards = acceptedCard.split(',');
        let cardValues = {};
        cards.forEach((card) => {
          if(this.cardsList.includes(card.trim())) {
            cardValues[card.trim()] = true;
          } else {
            this.statementOptFormGroup.patchValue({otherCard: card});
          }
        })

        console.log(cardValues)
        this.statementOptFormGroup.get('cardsCheck').patchValue(cardValues);
      }

    }
  }

  get form(): { [key: string]: FormControl } {
    return <{ [key: string]: FormControl }>this.statementOptFormGroup.controls;
  }

  onSave() {
    this.formsubmit = true;
    if (this.statementOptFormGroup.invalid) return;
    const { cardsCheck, otherCard, ...practiceFormValue } = this.statementOptFormGroup.value;
    let cards = '';
    practiceFormValue.acceptedCard = Object.keys(cardsCheck).forEach((card) => {
      if (cardsCheck[card]) {
        cards = cards ? `${cards},${card}` : card
      }
    })

    if(otherCard) {
      cards = `${cards},${otherCard}`
    }
    const practiceValue = {
      ...practiceFormValue,
    };

    let value: any = {
      ...this.practiceInfo,
      statementOption: practiceValue
    };
    value.statementOption = {};
    value.statementOption = {
      paymentGracePerios:
        this.statementOptFormGroup.get('paymentGracePerios').value,
      accountBalanceAmount: this.statementOptFormGroup.get(
        'accountBalanceAmount'
      ).value,
      defaultPaymentDueDate: this.statementOptFormGroup.get(
        'defaultPaymentDueDate'
      ).value,
      highlightPrintedStatement: this.statementOptFormGroup.get(
        'highlightPrintedStatement'
      ).value,
      printEstimateedPortion: this.statementOptFormGroup.get(
        'printEstimateedPortion'
      ).value,
      // acceptedCard: this.statementOptFormGroup.get(
      //   'acceptedCard'
      // ).value,
      acceptedCard: cards,
    };
    console.log('value 2 :', value);

    const saveStatementOptValue = {
      paymentGracePerios:
        parseInt(this.statementOptFormGroup.get('paymentGracePerios').value),
      accountBalanceAmount:
        this.statementOptFormGroup
          .get('accountBalanceAmount')
          .value.toString() || '',
      defaultPaymentDueDate: this.statementOptFormGroup.get(
        'defaultPaymentDueDate'
      ).value,
      highlightPrintedStatement: this.statementOptFormGroup.get(
        'highlightPrintedStatement'
      ).value,
      printEstimateedPortion: this.statementOptFormGroup.get(
        'printEstimateedPortion'
      ).value,
      acceptedCard: cards,
    };

    console.log('saveStatementOptValue :', saveStatementOptValue);

    this.sessionStorageService.set('practice-detail-data', value);

    this.PracticeManagerService.createStatementOpt(
      saveStatementOptValue
    ).subscribe({
      next: (res) => {
        console.log('res :', res);
        this.router.navigate([`practice-manager/fee-schedule`]);
      },
      error: (error) => {
        console.log(error);
      },
    });

    // console.log("practiceFormValuepracticeFormValue :", practiceFormValue)
    // console.log("practiceInfo: any; :",this.practiceInfo)
  }
}
