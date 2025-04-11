import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';

import { IHero, IPublisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<IPublisher>( IPublisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  })

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById( id )),
      ).subscribe( hero => {

        if(!hero) return this.router.navigateByUrl('/')

        this.heroForm.reset( hero )
        return;
      })
  }

  get currentHero(): IHero {
    const hero = this.heroForm.value as IHero;
    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe(hero => {
        this.showSnackbar(`${ hero.superhero } actualizado!`)
      });
      return
    }

    this.heroesService.addHero( this.currentHero).subscribe(hero => {
      this.router.navigate(['/heroes/edit', hero.id])
      this.showSnackbar(`${ hero.superhero } añadido!`)
    })
  }

  onDeleteHero() {
    if ( !this.currentHero.id ) {
      throw Error('Hero id is required')
    }

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
        filter( (wasDeleted: boolean ) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes'])
        this.showSnackbar(`${ this.currentHero.superhero } fue eliminado`)
      })
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'Cerrar', {
      duration: 2500
    })
  }

}
